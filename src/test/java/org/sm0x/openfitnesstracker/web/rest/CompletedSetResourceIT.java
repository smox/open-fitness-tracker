package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.CompletedSet;
import org.sm0x.openfitnesstracker.repository.CompletedSetRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CompletedSetResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CompletedSetResourceIT {

    private static final Integer DEFAULT_SET = 1;
    private static final Integer UPDATED_SET = 2;

    private static final Integer DEFAULT_REPETITIONS = 1;
    private static final Integer UPDATED_REPETITIONS = 2;

    @Autowired
    private CompletedSetRepository completedSetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCompletedSetMockMvc;

    private CompletedSet completedSet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompletedSet createEntity(EntityManager em) {
        CompletedSet completedSet = new CompletedSet()
            .set(DEFAULT_SET)
            .repetitions(DEFAULT_REPETITIONS);
        return completedSet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompletedSet createUpdatedEntity(EntityManager em) {
        CompletedSet completedSet = new CompletedSet()
            .set(UPDATED_SET)
            .repetitions(UPDATED_REPETITIONS);
        return completedSet;
    }

    @BeforeEach
    public void initTest() {
        completedSet = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompletedSet() throws Exception {
        int databaseSizeBeforeCreate = completedSetRepository.findAll().size();
        // Create the CompletedSet
        restCompletedSetMockMvc.perform(post("/api/completed-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(completedSet)))
            .andExpect(status().isCreated());

        // Validate the CompletedSet in the database
        List<CompletedSet> completedSetList = completedSetRepository.findAll();
        assertThat(completedSetList).hasSize(databaseSizeBeforeCreate + 1);
        CompletedSet testCompletedSet = completedSetList.get(completedSetList.size() - 1);
        assertThat(testCompletedSet.getSet()).isEqualTo(DEFAULT_SET);
        assertThat(testCompletedSet.getRepetitions()).isEqualTo(DEFAULT_REPETITIONS);
    }

    @Test
    @Transactional
    public void createCompletedSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = completedSetRepository.findAll().size();

        // Create the CompletedSet with an existing ID
        completedSet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompletedSetMockMvc.perform(post("/api/completed-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(completedSet)))
            .andExpect(status().isBadRequest());

        // Validate the CompletedSet in the database
        List<CompletedSet> completedSetList = completedSetRepository.findAll();
        assertThat(completedSetList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCompletedSets() throws Exception {
        // Initialize the database
        completedSetRepository.saveAndFlush(completedSet);

        // Get all the completedSetList
        restCompletedSetMockMvc.perform(get("/api/completed-sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(completedSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].set").value(hasItem(DEFAULT_SET)))
            .andExpect(jsonPath("$.[*].repetitions").value(hasItem(DEFAULT_REPETITIONS)));
    }
    
    @Test
    @Transactional
    public void getCompletedSet() throws Exception {
        // Initialize the database
        completedSetRepository.saveAndFlush(completedSet);

        // Get the completedSet
        restCompletedSetMockMvc.perform(get("/api/completed-sets/{id}", completedSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(completedSet.getId().intValue()))
            .andExpect(jsonPath("$.set").value(DEFAULT_SET))
            .andExpect(jsonPath("$.repetitions").value(DEFAULT_REPETITIONS));
    }
    @Test
    @Transactional
    public void getNonExistingCompletedSet() throws Exception {
        // Get the completedSet
        restCompletedSetMockMvc.perform(get("/api/completed-sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompletedSet() throws Exception {
        // Initialize the database
        completedSetRepository.saveAndFlush(completedSet);

        int databaseSizeBeforeUpdate = completedSetRepository.findAll().size();

        // Update the completedSet
        CompletedSet updatedCompletedSet = completedSetRepository.findById(completedSet.getId()).get();
        // Disconnect from session so that the updates on updatedCompletedSet are not directly saved in db
        em.detach(updatedCompletedSet);
        updatedCompletedSet
            .set(UPDATED_SET)
            .repetitions(UPDATED_REPETITIONS);

        restCompletedSetMockMvc.perform(put("/api/completed-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompletedSet)))
            .andExpect(status().isOk());

        // Validate the CompletedSet in the database
        List<CompletedSet> completedSetList = completedSetRepository.findAll();
        assertThat(completedSetList).hasSize(databaseSizeBeforeUpdate);
        CompletedSet testCompletedSet = completedSetList.get(completedSetList.size() - 1);
        assertThat(testCompletedSet.getSet()).isEqualTo(UPDATED_SET);
        assertThat(testCompletedSet.getRepetitions()).isEqualTo(UPDATED_REPETITIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingCompletedSet() throws Exception {
        int databaseSizeBeforeUpdate = completedSetRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompletedSetMockMvc.perform(put("/api/completed-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(completedSet)))
            .andExpect(status().isBadRequest());

        // Validate the CompletedSet in the database
        List<CompletedSet> completedSetList = completedSetRepository.findAll();
        assertThat(completedSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompletedSet() throws Exception {
        // Initialize the database
        completedSetRepository.saveAndFlush(completedSet);

        int databaseSizeBeforeDelete = completedSetRepository.findAll().size();

        // Delete the completedSet
        restCompletedSetMockMvc.perform(delete("/api/completed-sets/{id}", completedSet.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CompletedSet> completedSetList = completedSetRepository.findAll();
        assertThat(completedSetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
