package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.TargetWeight;
import org.sm0x.openfitnesstracker.repository.TargetWeightRepository;

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
 * Integration tests for the {@link TargetWeightResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TargetWeightResourceIT {

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private TargetWeightRepository targetWeightRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTargetWeightMockMvc;

    private TargetWeight targetWeight;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TargetWeight createEntity(EntityManager em) {
        TargetWeight targetWeight = new TargetWeight()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return targetWeight;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TargetWeight createUpdatedEntity(EntityManager em) {
        TargetWeight targetWeight = new TargetWeight()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return targetWeight;
    }

    @BeforeEach
    public void initTest() {
        targetWeight = createEntity(em);
    }

    @Test
    @Transactional
    public void createTargetWeight() throws Exception {
        int databaseSizeBeforeCreate = targetWeightRepository.findAll().size();
        // Create the TargetWeight
        restTargetWeightMockMvc.perform(post("/api/target-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(targetWeight)))
            .andExpect(status().isCreated());

        // Validate the TargetWeight in the database
        List<TargetWeight> targetWeightList = targetWeightRepository.findAll();
        assertThat(targetWeightList).hasSize(databaseSizeBeforeCreate + 1);
        TargetWeight testTargetWeight = targetWeightList.get(targetWeightList.size() - 1);
        assertThat(testTargetWeight.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTargetWeight.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createTargetWeightWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = targetWeightRepository.findAll().size();

        // Create the TargetWeight with an existing ID
        targetWeight.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTargetWeightMockMvc.perform(post("/api/target-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(targetWeight)))
            .andExpect(status().isBadRequest());

        // Validate the TargetWeight in the database
        List<TargetWeight> targetWeightList = targetWeightRepository.findAll();
        assertThat(targetWeightList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTargetWeights() throws Exception {
        // Initialize the database
        targetWeightRepository.saveAndFlush(targetWeight);

        // Get all the targetWeightList
        restTargetWeightMockMvc.perform(get("/api/target-weights?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(targetWeight.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))));
    }
    
    @Test
    @Transactional
    public void getTargetWeight() throws Exception {
        // Initialize the database
        targetWeightRepository.saveAndFlush(targetWeight);

        // Get the targetWeight
        restTargetWeightMockMvc.perform(get("/api/target-weights/{id}", targetWeight.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(targetWeight.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingTargetWeight() throws Exception {
        // Get the targetWeight
        restTargetWeightMockMvc.perform(get("/api/target-weights/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTargetWeight() throws Exception {
        // Initialize the database
        targetWeightRepository.saveAndFlush(targetWeight);

        int databaseSizeBeforeUpdate = targetWeightRepository.findAll().size();

        // Update the targetWeight
        TargetWeight updatedTargetWeight = targetWeightRepository.findById(targetWeight.getId()).get();
        // Disconnect from session so that the updates on updatedTargetWeight are not directly saved in db
        em.detach(updatedTargetWeight);
        updatedTargetWeight
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restTargetWeightMockMvc.perform(put("/api/target-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTargetWeight)))
            .andExpect(status().isOk());

        // Validate the TargetWeight in the database
        List<TargetWeight> targetWeightList = targetWeightRepository.findAll();
        assertThat(targetWeightList).hasSize(databaseSizeBeforeUpdate);
        TargetWeight testTargetWeight = targetWeightList.get(targetWeightList.size() - 1);
        assertThat(testTargetWeight.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTargetWeight.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTargetWeight() throws Exception {
        int databaseSizeBeforeUpdate = targetWeightRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTargetWeightMockMvc.perform(put("/api/target-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(targetWeight)))
            .andExpect(status().isBadRequest());

        // Validate the TargetWeight in the database
        List<TargetWeight> targetWeightList = targetWeightRepository.findAll();
        assertThat(targetWeightList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTargetWeight() throws Exception {
        // Initialize the database
        targetWeightRepository.saveAndFlush(targetWeight);

        int databaseSizeBeforeDelete = targetWeightRepository.findAll().size();

        // Delete the targetWeight
        restTargetWeightMockMvc.perform(delete("/api/target-weights/{id}", targetWeight.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TargetWeight> targetWeightList = targetWeightRepository.findAll();
        assertThat(targetWeightList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
