package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.TrainingUnit;
import org.sm0x.openfitnesstracker.repository.TrainingUnitRepository;

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
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.sm0x.openfitnesstracker.domain.enumeration.DayOfWeek;
/**
 * Integration tests for the {@link TrainingUnitResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class TrainingUnitResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final DayOfWeek DEFAULT_DAY_OF_WEEK = DayOfWeek.MONDAY;
    private static final DayOfWeek UPDATED_DAY_OF_WEEK = DayOfWeek.TUESDAY;

    private static final String DEFAULT_TIME = "AAAAAAAAAA";
    private static final String UPDATED_TIME = "BBBBBBBBBB";

    private static final Duration DEFAULT_PAUSE_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_PAUSE_TIME = Duration.ofHours(12);

    private static final Duration DEFAULT_WARUMUP_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_WARUMUP_TIME = Duration.ofHours(12);

    private static final Duration DEFAULT_PREWORKOUT_COUNTDOWN_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_PREWORKOUT_COUNTDOWN_TIME = Duration.ofHours(12);

    @Autowired
    private TrainingUnitRepository trainingUnitRepository;

    @Mock
    private TrainingUnitRepository trainingUnitRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrainingUnitMockMvc;

    private TrainingUnit trainingUnit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingUnit createEntity(EntityManager em) {
        TrainingUnit trainingUnit = new TrainingUnit()
            .name(DEFAULT_NAME)
            .dayOfWeek(DEFAULT_DAY_OF_WEEK)
            .time(DEFAULT_TIME)
            .pauseTime(DEFAULT_PAUSE_TIME)
            .warumupTime(DEFAULT_WARUMUP_TIME)
            .preworkoutCountdownTime(DEFAULT_PREWORKOUT_COUNTDOWN_TIME);
        return trainingUnit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingUnit createUpdatedEntity(EntityManager em) {
        TrainingUnit trainingUnit = new TrainingUnit()
            .name(UPDATED_NAME)
            .dayOfWeek(UPDATED_DAY_OF_WEEK)
            .time(UPDATED_TIME)
            .pauseTime(UPDATED_PAUSE_TIME)
            .warumupTime(UPDATED_WARUMUP_TIME)
            .preworkoutCountdownTime(UPDATED_PREWORKOUT_COUNTDOWN_TIME);
        return trainingUnit;
    }

    @BeforeEach
    public void initTest() {
        trainingUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrainingUnit() throws Exception {
        int databaseSizeBeforeCreate = trainingUnitRepository.findAll().size();
        // Create the TrainingUnit
        restTrainingUnitMockMvc.perform(post("/api/training-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trainingUnit)))
            .andExpect(status().isCreated());

        // Validate the TrainingUnit in the database
        List<TrainingUnit> trainingUnitList = trainingUnitRepository.findAll();
        assertThat(trainingUnitList).hasSize(databaseSizeBeforeCreate + 1);
        TrainingUnit testTrainingUnit = trainingUnitList.get(trainingUnitList.size() - 1);
        assertThat(testTrainingUnit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTrainingUnit.getDayOfWeek()).isEqualTo(DEFAULT_DAY_OF_WEEK);
        assertThat(testTrainingUnit.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testTrainingUnit.getPauseTime()).isEqualTo(DEFAULT_PAUSE_TIME);
        assertThat(testTrainingUnit.getWarumupTime()).isEqualTo(DEFAULT_WARUMUP_TIME);
        assertThat(testTrainingUnit.getPreworkoutCountdownTime()).isEqualTo(DEFAULT_PREWORKOUT_COUNTDOWN_TIME);
    }

    @Test
    @Transactional
    public void createTrainingUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingUnitRepository.findAll().size();

        // Create the TrainingUnit with an existing ID
        trainingUnit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingUnitMockMvc.perform(post("/api/training-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trainingUnit)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingUnit in the database
        List<TrainingUnit> trainingUnitList = trainingUnitRepository.findAll();
        assertThat(trainingUnitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTrainingUnits() throws Exception {
        // Initialize the database
        trainingUnitRepository.saveAndFlush(trainingUnit);

        // Get all the trainingUnitList
        restTrainingUnitMockMvc.perform(get("/api/training-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].dayOfWeek").value(hasItem(DEFAULT_DAY_OF_WEEK.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME)))
            .andExpect(jsonPath("$.[*].pauseTime").value(hasItem(DEFAULT_PAUSE_TIME.toString())))
            .andExpect(jsonPath("$.[*].warumupTime").value(hasItem(DEFAULT_WARUMUP_TIME.toString())))
            .andExpect(jsonPath("$.[*].preworkoutCountdownTime").value(hasItem(DEFAULT_PREWORKOUT_COUNTDOWN_TIME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTrainingUnitsWithEagerRelationshipsIsEnabled() throws Exception {
        when(trainingUnitRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrainingUnitMockMvc.perform(get("/api/training-units?eagerload=true"))
            .andExpect(status().isOk());

        verify(trainingUnitRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTrainingUnitsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(trainingUnitRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrainingUnitMockMvc.perform(get("/api/training-units?eagerload=true"))
            .andExpect(status().isOk());

        verify(trainingUnitRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTrainingUnit() throws Exception {
        // Initialize the database
        trainingUnitRepository.saveAndFlush(trainingUnit);

        // Get the trainingUnit
        restTrainingUnitMockMvc.perform(get("/api/training-units/{id}", trainingUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trainingUnit.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.dayOfWeek").value(DEFAULT_DAY_OF_WEEK.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME))
            .andExpect(jsonPath("$.pauseTime").value(DEFAULT_PAUSE_TIME.toString()))
            .andExpect(jsonPath("$.warumupTime").value(DEFAULT_WARUMUP_TIME.toString()))
            .andExpect(jsonPath("$.preworkoutCountdownTime").value(DEFAULT_PREWORKOUT_COUNTDOWN_TIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTrainingUnit() throws Exception {
        // Get the trainingUnit
        restTrainingUnitMockMvc.perform(get("/api/training-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrainingUnit() throws Exception {
        // Initialize the database
        trainingUnitRepository.saveAndFlush(trainingUnit);

        int databaseSizeBeforeUpdate = trainingUnitRepository.findAll().size();

        // Update the trainingUnit
        TrainingUnit updatedTrainingUnit = trainingUnitRepository.findById(trainingUnit.getId()).get();
        // Disconnect from session so that the updates on updatedTrainingUnit are not directly saved in db
        em.detach(updatedTrainingUnit);
        updatedTrainingUnit
            .name(UPDATED_NAME)
            .dayOfWeek(UPDATED_DAY_OF_WEEK)
            .time(UPDATED_TIME)
            .pauseTime(UPDATED_PAUSE_TIME)
            .warumupTime(UPDATED_WARUMUP_TIME)
            .preworkoutCountdownTime(UPDATED_PREWORKOUT_COUNTDOWN_TIME);

        restTrainingUnitMockMvc.perform(put("/api/training-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainingUnit)))
            .andExpect(status().isOk());

        // Validate the TrainingUnit in the database
        List<TrainingUnit> trainingUnitList = trainingUnitRepository.findAll();
        assertThat(trainingUnitList).hasSize(databaseSizeBeforeUpdate);
        TrainingUnit testTrainingUnit = trainingUnitList.get(trainingUnitList.size() - 1);
        assertThat(testTrainingUnit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrainingUnit.getDayOfWeek()).isEqualTo(UPDATED_DAY_OF_WEEK);
        assertThat(testTrainingUnit.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testTrainingUnit.getPauseTime()).isEqualTo(UPDATED_PAUSE_TIME);
        assertThat(testTrainingUnit.getWarumupTime()).isEqualTo(UPDATED_WARUMUP_TIME);
        assertThat(testTrainingUnit.getPreworkoutCountdownTime()).isEqualTo(UPDATED_PREWORKOUT_COUNTDOWN_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingTrainingUnit() throws Exception {
        int databaseSizeBeforeUpdate = trainingUnitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingUnitMockMvc.perform(put("/api/training-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trainingUnit)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingUnit in the database
        List<TrainingUnit> trainingUnitList = trainingUnitRepository.findAll();
        assertThat(trainingUnitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrainingUnit() throws Exception {
        // Initialize the database
        trainingUnitRepository.saveAndFlush(trainingUnit);

        int databaseSizeBeforeDelete = trainingUnitRepository.findAll().size();

        // Delete the trainingUnit
        restTrainingUnitMockMvc.perform(delete("/api/training-units/{id}", trainingUnit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TrainingUnit> trainingUnitList = trainingUnitRepository.findAll();
        assertThat(trainingUnitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
