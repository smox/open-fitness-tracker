package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.ApplicationSettings;
import org.sm0x.openfitnesstracker.repository.ApplicationSettingsRepository;

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
import java.time.Duration;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ApplicationSettingsResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ApplicationSettingsResourceIT {

    private static final String DEFAULT_DEFAULT_THEME = "AAAAAAAAAA";
    private static final String UPDATED_DEFAULT_THEME = "BBBBBBBBBB";

    private static final Duration DEFAULT_DEFAULT_WARMUP_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_DEFAULT_WARMUP_TIME = Duration.ofHours(12);

    private static final Duration DEFAULT_DEFAULT_PRE_WORKOUT_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_DEFAULT_PRE_WORKOUT_TIME = Duration.ofHours(12);

    private static final Integer DEFAULT_DEFAULT_SET_COUNT = 1;
    private static final Integer UPDATED_DEFAULT_SET_COUNT = 2;

    @Autowired
    private ApplicationSettingsRepository applicationSettingsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restApplicationSettingsMockMvc;

    private ApplicationSettings applicationSettings;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApplicationSettings createEntity(EntityManager em) {
        ApplicationSettings applicationSettings = new ApplicationSettings()
            .defaultTheme(DEFAULT_DEFAULT_THEME)
            .defaultWarmupTime(DEFAULT_DEFAULT_WARMUP_TIME)
            .defaultPreWorkoutTime(DEFAULT_DEFAULT_PRE_WORKOUT_TIME)
            .defaultSetCount(DEFAULT_DEFAULT_SET_COUNT);
        return applicationSettings;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApplicationSettings createUpdatedEntity(EntityManager em) {
        ApplicationSettings applicationSettings = new ApplicationSettings()
            .defaultTheme(UPDATED_DEFAULT_THEME)
            .defaultWarmupTime(UPDATED_DEFAULT_WARMUP_TIME)
            .defaultPreWorkoutTime(UPDATED_DEFAULT_PRE_WORKOUT_TIME)
            .defaultSetCount(UPDATED_DEFAULT_SET_COUNT);
        return applicationSettings;
    }

    @BeforeEach
    public void initTest() {
        applicationSettings = createEntity(em);
    }

    @Test
    @Transactional
    public void createApplicationSettings() throws Exception {
        int databaseSizeBeforeCreate = applicationSettingsRepository.findAll().size();
        // Create the ApplicationSettings
        restApplicationSettingsMockMvc.perform(post("/api/application-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(applicationSettings)))
            .andExpect(status().isCreated());

        // Validate the ApplicationSettings in the database
        List<ApplicationSettings> applicationSettingsList = applicationSettingsRepository.findAll();
        assertThat(applicationSettingsList).hasSize(databaseSizeBeforeCreate + 1);
        ApplicationSettings testApplicationSettings = applicationSettingsList.get(applicationSettingsList.size() - 1);
        assertThat(testApplicationSettings.getDefaultTheme()).isEqualTo(DEFAULT_DEFAULT_THEME);
        assertThat(testApplicationSettings.getDefaultWarmupTime()).isEqualTo(DEFAULT_DEFAULT_WARMUP_TIME);
        assertThat(testApplicationSettings.getDefaultPreWorkoutTime()).isEqualTo(DEFAULT_DEFAULT_PRE_WORKOUT_TIME);
        assertThat(testApplicationSettings.getDefaultSetCount()).isEqualTo(DEFAULT_DEFAULT_SET_COUNT);
    }

    @Test
    @Transactional
    public void createApplicationSettingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationSettingsRepository.findAll().size();

        // Create the ApplicationSettings with an existing ID
        applicationSettings.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationSettingsMockMvc.perform(post("/api/application-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(applicationSettings)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationSettings in the database
        List<ApplicationSettings> applicationSettingsList = applicationSettingsRepository.findAll();
        assertThat(applicationSettingsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllApplicationSettings() throws Exception {
        // Initialize the database
        applicationSettingsRepository.saveAndFlush(applicationSettings);

        // Get all the applicationSettingsList
        restApplicationSettingsMockMvc.perform(get("/api/application-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicationSettings.getId().intValue())))
            .andExpect(jsonPath("$.[*].defaultTheme").value(hasItem(DEFAULT_DEFAULT_THEME)))
            .andExpect(jsonPath("$.[*].defaultWarmupTime").value(hasItem(DEFAULT_DEFAULT_WARMUP_TIME.toString())))
            .andExpect(jsonPath("$.[*].defaultPreWorkoutTime").value(hasItem(DEFAULT_DEFAULT_PRE_WORKOUT_TIME.toString())))
            .andExpect(jsonPath("$.[*].defaultSetCount").value(hasItem(DEFAULT_DEFAULT_SET_COUNT)));
    }
    
    @Test
    @Transactional
    public void getApplicationSettings() throws Exception {
        // Initialize the database
        applicationSettingsRepository.saveAndFlush(applicationSettings);

        // Get the applicationSettings
        restApplicationSettingsMockMvc.perform(get("/api/application-settings/{id}", applicationSettings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(applicationSettings.getId().intValue()))
            .andExpect(jsonPath("$.defaultTheme").value(DEFAULT_DEFAULT_THEME))
            .andExpect(jsonPath("$.defaultWarmupTime").value(DEFAULT_DEFAULT_WARMUP_TIME.toString()))
            .andExpect(jsonPath("$.defaultPreWorkoutTime").value(DEFAULT_DEFAULT_PRE_WORKOUT_TIME.toString()))
            .andExpect(jsonPath("$.defaultSetCount").value(DEFAULT_DEFAULT_SET_COUNT));
    }
    @Test
    @Transactional
    public void getNonExistingApplicationSettings() throws Exception {
        // Get the applicationSettings
        restApplicationSettingsMockMvc.perform(get("/api/application-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplicationSettings() throws Exception {
        // Initialize the database
        applicationSettingsRepository.saveAndFlush(applicationSettings);

        int databaseSizeBeforeUpdate = applicationSettingsRepository.findAll().size();

        // Update the applicationSettings
        ApplicationSettings updatedApplicationSettings = applicationSettingsRepository.findById(applicationSettings.getId()).get();
        // Disconnect from session so that the updates on updatedApplicationSettings are not directly saved in db
        em.detach(updatedApplicationSettings);
        updatedApplicationSettings
            .defaultTheme(UPDATED_DEFAULT_THEME)
            .defaultWarmupTime(UPDATED_DEFAULT_WARMUP_TIME)
            .defaultPreWorkoutTime(UPDATED_DEFAULT_PRE_WORKOUT_TIME)
            .defaultSetCount(UPDATED_DEFAULT_SET_COUNT);

        restApplicationSettingsMockMvc.perform(put("/api/application-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplicationSettings)))
            .andExpect(status().isOk());

        // Validate the ApplicationSettings in the database
        List<ApplicationSettings> applicationSettingsList = applicationSettingsRepository.findAll();
        assertThat(applicationSettingsList).hasSize(databaseSizeBeforeUpdate);
        ApplicationSettings testApplicationSettings = applicationSettingsList.get(applicationSettingsList.size() - 1);
        assertThat(testApplicationSettings.getDefaultTheme()).isEqualTo(UPDATED_DEFAULT_THEME);
        assertThat(testApplicationSettings.getDefaultWarmupTime()).isEqualTo(UPDATED_DEFAULT_WARMUP_TIME);
        assertThat(testApplicationSettings.getDefaultPreWorkoutTime()).isEqualTo(UPDATED_DEFAULT_PRE_WORKOUT_TIME);
        assertThat(testApplicationSettings.getDefaultSetCount()).isEqualTo(UPDATED_DEFAULT_SET_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingApplicationSettings() throws Exception {
        int databaseSizeBeforeUpdate = applicationSettingsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApplicationSettingsMockMvc.perform(put("/api/application-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(applicationSettings)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationSettings in the database
        List<ApplicationSettings> applicationSettingsList = applicationSettingsRepository.findAll();
        assertThat(applicationSettingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApplicationSettings() throws Exception {
        // Initialize the database
        applicationSettingsRepository.saveAndFlush(applicationSettings);

        int databaseSizeBeforeDelete = applicationSettingsRepository.findAll().size();

        // Delete the applicationSettings
        restApplicationSettingsMockMvc.perform(delete("/api/application-settings/{id}", applicationSettings.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ApplicationSettings> applicationSettingsList = applicationSettingsRepository.findAll();
        assertThat(applicationSettingsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
