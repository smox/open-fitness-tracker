package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.ProtocolledWeight;
import org.sm0x.openfitnesstracker.repository.ProtocolledWeightRepository;

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
 * Integration tests for the {@link ProtocolledWeightResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProtocolledWeightResourceIT {

    private static final ZonedDateTime DEFAULT_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ProtocolledWeightRepository protocolledWeightRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProtocolledWeightMockMvc;

    private ProtocolledWeight protocolledWeight;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProtocolledWeight createEntity(EntityManager em) {
        ProtocolledWeight protocolledWeight = new ProtocolledWeight()
            .time(DEFAULT_TIME);
        return protocolledWeight;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProtocolledWeight createUpdatedEntity(EntityManager em) {
        ProtocolledWeight protocolledWeight = new ProtocolledWeight()
            .time(UPDATED_TIME);
        return protocolledWeight;
    }

    @BeforeEach
    public void initTest() {
        protocolledWeight = createEntity(em);
    }

    @Test
    @Transactional
    public void createProtocolledWeight() throws Exception {
        int databaseSizeBeforeCreate = protocolledWeightRepository.findAll().size();
        // Create the ProtocolledWeight
        restProtocolledWeightMockMvc.perform(post("/api/protocolled-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(protocolledWeight)))
            .andExpect(status().isCreated());

        // Validate the ProtocolledWeight in the database
        List<ProtocolledWeight> protocolledWeightList = protocolledWeightRepository.findAll();
        assertThat(protocolledWeightList).hasSize(databaseSizeBeforeCreate + 1);
        ProtocolledWeight testProtocolledWeight = protocolledWeightList.get(protocolledWeightList.size() - 1);
        assertThat(testProtocolledWeight.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createProtocolledWeightWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = protocolledWeightRepository.findAll().size();

        // Create the ProtocolledWeight with an existing ID
        protocolledWeight.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProtocolledWeightMockMvc.perform(post("/api/protocolled-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(protocolledWeight)))
            .andExpect(status().isBadRequest());

        // Validate the ProtocolledWeight in the database
        List<ProtocolledWeight> protocolledWeightList = protocolledWeightRepository.findAll();
        assertThat(protocolledWeightList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProtocolledWeights() throws Exception {
        // Initialize the database
        protocolledWeightRepository.saveAndFlush(protocolledWeight);

        // Get all the protocolledWeightList
        restProtocolledWeightMockMvc.perform(get("/api/protocolled-weights?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(protocolledWeight.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(sameInstant(DEFAULT_TIME))));
    }
    
    @Test
    @Transactional
    public void getProtocolledWeight() throws Exception {
        // Initialize the database
        protocolledWeightRepository.saveAndFlush(protocolledWeight);

        // Get the protocolledWeight
        restProtocolledWeightMockMvc.perform(get("/api/protocolled-weights/{id}", protocolledWeight.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(protocolledWeight.getId().intValue()))
            .andExpect(jsonPath("$.time").value(sameInstant(DEFAULT_TIME)));
    }
    @Test
    @Transactional
    public void getNonExistingProtocolledWeight() throws Exception {
        // Get the protocolledWeight
        restProtocolledWeightMockMvc.perform(get("/api/protocolled-weights/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProtocolledWeight() throws Exception {
        // Initialize the database
        protocolledWeightRepository.saveAndFlush(protocolledWeight);

        int databaseSizeBeforeUpdate = protocolledWeightRepository.findAll().size();

        // Update the protocolledWeight
        ProtocolledWeight updatedProtocolledWeight = protocolledWeightRepository.findById(protocolledWeight.getId()).get();
        // Disconnect from session so that the updates on updatedProtocolledWeight are not directly saved in db
        em.detach(updatedProtocolledWeight);
        updatedProtocolledWeight
            .time(UPDATED_TIME);

        restProtocolledWeightMockMvc.perform(put("/api/protocolled-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProtocolledWeight)))
            .andExpect(status().isOk());

        // Validate the ProtocolledWeight in the database
        List<ProtocolledWeight> protocolledWeightList = protocolledWeightRepository.findAll();
        assertThat(protocolledWeightList).hasSize(databaseSizeBeforeUpdate);
        ProtocolledWeight testProtocolledWeight = protocolledWeightList.get(protocolledWeightList.size() - 1);
        assertThat(testProtocolledWeight.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingProtocolledWeight() throws Exception {
        int databaseSizeBeforeUpdate = protocolledWeightRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProtocolledWeightMockMvc.perform(put("/api/protocolled-weights")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(protocolledWeight)))
            .andExpect(status().isBadRequest());

        // Validate the ProtocolledWeight in the database
        List<ProtocolledWeight> protocolledWeightList = protocolledWeightRepository.findAll();
        assertThat(protocolledWeightList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProtocolledWeight() throws Exception {
        // Initialize the database
        protocolledWeightRepository.saveAndFlush(protocolledWeight);

        int databaseSizeBeforeDelete = protocolledWeightRepository.findAll().size();

        // Delete the protocolledWeight
        restProtocolledWeightMockMvc.perform(delete("/api/protocolled-weights/{id}", protocolledWeight.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProtocolledWeight> protocolledWeightList = protocolledWeightRepository.findAll();
        assertThat(protocolledWeightList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
