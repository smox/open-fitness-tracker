package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.TrainingSchedule;
import org.sm0x.openfitnesstracker.repository.TrainingScheduleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static org.sm0x.openfitnesstracker.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrainingScheduleResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class TrainingScheduleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private TrainingScheduleRepository trainingScheduleRepository;

    @Mock
    private TrainingScheduleRepository trainingScheduleRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrainingScheduleMockMvc;

    private TrainingSchedule trainingSchedule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingSchedule createEntity(EntityManager em) {
        TrainingSchedule trainingSchedule = new TrainingSchedule()
            .name(DEFAULT_NAME)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return trainingSchedule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingSchedule createUpdatedEntity(EntityManager em) {
        TrainingSchedule trainingSchedule = new TrainingSchedule()
            .name(UPDATED_NAME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return trainingSchedule;
    }

    @BeforeEach
    public void initTest() {
        trainingSchedule = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrainingSchedule() throws Exception {
        int databaseSizeBeforeCreate = trainingScheduleRepository.findAll().size();
        // Create the TrainingSchedule
        restTrainingScheduleMockMvc.perform(post("/api/training-schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trainingSchedule)))
            .andExpect(status().isCreated());

        // Validate the TrainingSchedule in the database
        List<TrainingSchedule> trainingScheduleList = trainingScheduleRepository.findAll();
        assertThat(trainingScheduleList).hasSize(databaseSizeBeforeCreate + 1);
        TrainingSchedule testTrainingSchedule = trainingScheduleList.get(trainingScheduleList.size() - 1);
        assertThat(testTrainingSchedule.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTrainingSchedule.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTrainingSchedule.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createTrainingScheduleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingScheduleRepository.findAll().size();

        // Create the TrainingSchedule with an existing ID
        trainingSchedule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingScheduleMockMvc.perform(post("/api/training-schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trainingSchedule)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingSchedule in the database
        List<TrainingSchedule> trainingScheduleList = trainingScheduleRepository.findAll();
        assertThat(trainingScheduleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTrainingSchedules() throws Exception {
        // Initialize the database
        trainingScheduleRepository.saveAndFlush(trainingSchedule);

        // Get all the trainingScheduleList
        restTrainingScheduleMockMvc.perform(get("/api/training-schedules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingSchedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTrainingSchedulesWithEagerRelationshipsIsEnabled() throws Exception {
        when(trainingScheduleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrainingScheduleMockMvc.perform(get("/api/training-schedules?eagerload=true"))
            .andExpect(status().isOk());

        verify(trainingScheduleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTrainingSchedulesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(trainingScheduleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrainingScheduleMockMvc.perform(get("/api/training-schedules?eagerload=true"))
            .andExpect(status().isOk());

        verify(trainingScheduleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTrainingSchedule() throws Exception {
        // Initialize the database
        trainingScheduleRepository.saveAndFlush(trainingSchedule);

        // Get the trainingSchedule
        restTrainingScheduleMockMvc.perform(get("/api/training-schedules/{id}", trainingSchedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trainingSchedule.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingTrainingSchedule() throws Exception {
        // Get the trainingSchedule
        restTrainingScheduleMockMvc.perform(get("/api/training-schedules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrainingSchedule() throws Exception {
        // Initialize the database
        trainingScheduleRepository.saveAndFlush(trainingSchedule);

        int databaseSizeBeforeUpdate = trainingScheduleRepository.findAll().size();

        // Update the trainingSchedule
        TrainingSchedule updatedTrainingSchedule = trainingScheduleRepository.findById(trainingSchedule.getId()).get();
        // Disconnect from session so that the updates on updatedTrainingSchedule are not directly saved in db
        em.detach(updatedTrainingSchedule);
        updatedTrainingSchedule
            .name(UPDATED_NAME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restTrainingScheduleMockMvc.perform(put("/api/training-schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainingSchedule)))
            .andExpect(status().isOk());

        // Validate the TrainingSchedule in the database
        List<TrainingSchedule> trainingScheduleList = trainingScheduleRepository.findAll();
        assertThat(trainingScheduleList).hasSize(databaseSizeBeforeUpdate);
        TrainingSchedule testTrainingSchedule = trainingScheduleList.get(trainingScheduleList.size() - 1);
        assertThat(testTrainingSchedule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrainingSchedule.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTrainingSchedule.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTrainingSchedule() throws Exception {
        int databaseSizeBeforeUpdate = trainingScheduleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingScheduleMockMvc.perform(put("/api/training-schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trainingSchedule)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingSchedule in the database
        List<TrainingSchedule> trainingScheduleList = trainingScheduleRepository.findAll();
        assertThat(trainingScheduleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrainingSchedule() throws Exception {
        // Initialize the database
        trainingScheduleRepository.saveAndFlush(trainingSchedule);

        int databaseSizeBeforeDelete = trainingScheduleRepository.findAll().size();

        // Delete the trainingSchedule
        restTrainingScheduleMockMvc.perform(delete("/api/training-schedules/{id}", trainingSchedule.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TrainingSchedule> trainingScheduleList = trainingScheduleRepository.findAll();
        assertThat(trainingScheduleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
