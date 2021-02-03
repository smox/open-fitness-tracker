package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.CompletedTraining;
import org.sm0x.openfitnesstracker.repository.CompletedTrainingRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static org.sm0x.openfitnesstracker.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CompletedTrainingResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CompletedTrainingResourceIT {

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private CompletedTrainingRepository completedTrainingRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCompletedTrainingMockMvc;

    private CompletedTraining completedTraining;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompletedTraining createEntity(EntityManager em) {
        CompletedTraining completedTraining = new CompletedTraining()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return completedTraining;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompletedTraining createUpdatedEntity(EntityManager em) {
        CompletedTraining completedTraining = new CompletedTraining()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return completedTraining;
    }

    @BeforeEach
    public void initTest() {
        completedTraining = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompletedTraining() throws Exception {
        int databaseSizeBeforeCreate = completedTrainingRepository.findAll().size();
        // Create the CompletedTraining
        restCompletedTrainingMockMvc.perform(post("/api/completed-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(completedTraining)))
            .andExpect(status().isCreated());

        // Validate the CompletedTraining in the database
        List<CompletedTraining> completedTrainingList = completedTrainingRepository.findAll();
        assertThat(completedTrainingList).hasSize(databaseSizeBeforeCreate + 1);
        CompletedTraining testCompletedTraining = completedTrainingList.get(completedTrainingList.size() - 1);
        assertThat(testCompletedTraining.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCompletedTraining.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createCompletedTrainingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = completedTrainingRepository.findAll().size();

        // Create the CompletedTraining with an existing ID
        completedTraining.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompletedTrainingMockMvc.perform(post("/api/completed-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(completedTraining)))
            .andExpect(status().isBadRequest());

        // Validate the CompletedTraining in the database
        List<CompletedTraining> completedTrainingList = completedTrainingRepository.findAll();
        assertThat(completedTrainingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCompletedTrainings() throws Exception {
        // Initialize the database
        completedTrainingRepository.saveAndFlush(completedTraining);

        // Get all the completedTrainingList
        restCompletedTrainingMockMvc.perform(get("/api/completed-trainings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(completedTraining.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))));
    }
    
    @Test
    @Transactional
    public void getCompletedTraining() throws Exception {
        // Initialize the database
        completedTrainingRepository.saveAndFlush(completedTraining);

        // Get the completedTraining
        restCompletedTrainingMockMvc.perform(get("/api/completed-trainings/{id}", completedTraining.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(completedTraining.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingCompletedTraining() throws Exception {
        // Get the completedTraining
        restCompletedTrainingMockMvc.perform(get("/api/completed-trainings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompletedTraining() throws Exception {
        // Initialize the database
        completedTrainingRepository.saveAndFlush(completedTraining);

        int databaseSizeBeforeUpdate = completedTrainingRepository.findAll().size();

        // Update the completedTraining
        CompletedTraining updatedCompletedTraining = completedTrainingRepository.findById(completedTraining.getId()).get();
        // Disconnect from session so that the updates on updatedCompletedTraining are not directly saved in db
        em.detach(updatedCompletedTraining);
        updatedCompletedTraining
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restCompletedTrainingMockMvc.perform(put("/api/completed-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompletedTraining)))
            .andExpect(status().isOk());

        // Validate the CompletedTraining in the database
        List<CompletedTraining> completedTrainingList = completedTrainingRepository.findAll();
        assertThat(completedTrainingList).hasSize(databaseSizeBeforeUpdate);
        CompletedTraining testCompletedTraining = completedTrainingList.get(completedTrainingList.size() - 1);
        assertThat(testCompletedTraining.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCompletedTraining.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCompletedTraining() throws Exception {
        int databaseSizeBeforeUpdate = completedTrainingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompletedTrainingMockMvc.perform(put("/api/completed-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(completedTraining)))
            .andExpect(status().isBadRequest());

        // Validate the CompletedTraining in the database
        List<CompletedTraining> completedTrainingList = completedTrainingRepository.findAll();
        assertThat(completedTrainingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompletedTraining() throws Exception {
        // Initialize the database
        completedTrainingRepository.saveAndFlush(completedTraining);

        int databaseSizeBeforeDelete = completedTrainingRepository.findAll().size();

        // Delete the completedTraining
        restCompletedTrainingMockMvc.perform(delete("/api/completed-trainings/{id}", completedTraining.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CompletedTraining> completedTrainingList = completedTrainingRepository.findAll();
        assertThat(completedTrainingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
