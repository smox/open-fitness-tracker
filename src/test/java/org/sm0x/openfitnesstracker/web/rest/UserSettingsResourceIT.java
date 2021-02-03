package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.UserSettings;
import org.sm0x.openfitnesstracker.repository.UserSettingsRepository;

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
 * Integration tests for the {@link UserSettingsResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserSettingsResourceIT {

    private static final String DEFAULT_SELECTED_THEME = "AAAAAAAAAA";
    private static final String UPDATED_SELECTED_THEME = "BBBBBBBBBB";

    private static final Duration DEFAULT_DEFAULT_WARMUP_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_DEFAULT_WARMUP_TIME = Duration.ofHours(12);

    private static final Duration DEFAULT_DEFAULT_PRE_WORKOUT_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_DEFAULT_PRE_WORKOUT_TIME = Duration.ofHours(12);

    private static final Integer DEFAULT_DEFAULT_SET_COUNT = 1;
    private static final Integer UPDATED_DEFAULT_SET_COUNT = 2;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserSettingsMockMvc;

    private UserSettings userSettings;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSettings createEntity(EntityManager em) {
        UserSettings userSettings = new UserSettings()
            .selectedTheme(DEFAULT_SELECTED_THEME)
            .defaultWarmupTime(DEFAULT_DEFAULT_WARMUP_TIME)
            .defaultPreWorkoutTime(DEFAULT_DEFAULT_PRE_WORKOUT_TIME)
            .defaultSetCount(DEFAULT_DEFAULT_SET_COUNT);
        return userSettings;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSettings createUpdatedEntity(EntityManager em) {
        UserSettings userSettings = new UserSettings()
            .selectedTheme(UPDATED_SELECTED_THEME)
            .defaultWarmupTime(UPDATED_DEFAULT_WARMUP_TIME)
            .defaultPreWorkoutTime(UPDATED_DEFAULT_PRE_WORKOUT_TIME)
            .defaultSetCount(UPDATED_DEFAULT_SET_COUNT);
        return userSettings;
    }

    @BeforeEach
    public void initTest() {
        userSettings = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSettings() throws Exception {
        int databaseSizeBeforeCreate = userSettingsRepository.findAll().size();
        // Create the UserSettings
        restUserSettingsMockMvc.perform(post("/api/user-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userSettings)))
            .andExpect(status().isCreated());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeCreate + 1);
        UserSettings testUserSettings = userSettingsList.get(userSettingsList.size() - 1);
        assertThat(testUserSettings.getSelectedTheme()).isEqualTo(DEFAULT_SELECTED_THEME);
        assertThat(testUserSettings.getDefaultWarmupTime()).isEqualTo(DEFAULT_DEFAULT_WARMUP_TIME);
        assertThat(testUserSettings.getDefaultPreWorkoutTime()).isEqualTo(DEFAULT_DEFAULT_PRE_WORKOUT_TIME);
        assertThat(testUserSettings.getDefaultSetCount()).isEqualTo(DEFAULT_DEFAULT_SET_COUNT);
    }

    @Test
    @Transactional
    public void createUserSettingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSettingsRepository.findAll().size();

        // Create the UserSettings with an existing ID
        userSettings.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSettingsMockMvc.perform(post("/api/user-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userSettings)))
            .andExpect(status().isBadRequest());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserSettings() throws Exception {
        // Initialize the database
        userSettingsRepository.saveAndFlush(userSettings);

        // Get all the userSettingsList
        restUserSettingsMockMvc.perform(get("/api/user-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSettings.getId().intValue())))
            .andExpect(jsonPath("$.[*].selectedTheme").value(hasItem(DEFAULT_SELECTED_THEME)))
            .andExpect(jsonPath("$.[*].defaultWarmupTime").value(hasItem(DEFAULT_DEFAULT_WARMUP_TIME.toString())))
            .andExpect(jsonPath("$.[*].defaultPreWorkoutTime").value(hasItem(DEFAULT_DEFAULT_PRE_WORKOUT_TIME.toString())))
            .andExpect(jsonPath("$.[*].defaultSetCount").value(hasItem(DEFAULT_DEFAULT_SET_COUNT)));
    }
    
    @Test
    @Transactional
    public void getUserSettings() throws Exception {
        // Initialize the database
        userSettingsRepository.saveAndFlush(userSettings);

        // Get the userSettings
        restUserSettingsMockMvc.perform(get("/api/user-settings/{id}", userSettings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userSettings.getId().intValue()))
            .andExpect(jsonPath("$.selectedTheme").value(DEFAULT_SELECTED_THEME))
            .andExpect(jsonPath("$.defaultWarmupTime").value(DEFAULT_DEFAULT_WARMUP_TIME.toString()))
            .andExpect(jsonPath("$.defaultPreWorkoutTime").value(DEFAULT_DEFAULT_PRE_WORKOUT_TIME.toString()))
            .andExpect(jsonPath("$.defaultSetCount").value(DEFAULT_DEFAULT_SET_COUNT));
    }
    @Test
    @Transactional
    public void getNonExistingUserSettings() throws Exception {
        // Get the userSettings
        restUserSettingsMockMvc.perform(get("/api/user-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSettings() throws Exception {
        // Initialize the database
        userSettingsRepository.saveAndFlush(userSettings);

        int databaseSizeBeforeUpdate = userSettingsRepository.findAll().size();

        // Update the userSettings
        UserSettings updatedUserSettings = userSettingsRepository.findById(userSettings.getId()).get();
        // Disconnect from session so that the updates on updatedUserSettings are not directly saved in db
        em.detach(updatedUserSettings);
        updatedUserSettings
            .selectedTheme(UPDATED_SELECTED_THEME)
            .defaultWarmupTime(UPDATED_DEFAULT_WARMUP_TIME)
            .defaultPreWorkoutTime(UPDATED_DEFAULT_PRE_WORKOUT_TIME)
            .defaultSetCount(UPDATED_DEFAULT_SET_COUNT);

        restUserSettingsMockMvc.perform(put("/api/user-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserSettings)))
            .andExpect(status().isOk());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeUpdate);
        UserSettings testUserSettings = userSettingsList.get(userSettingsList.size() - 1);
        assertThat(testUserSettings.getSelectedTheme()).isEqualTo(UPDATED_SELECTED_THEME);
        assertThat(testUserSettings.getDefaultWarmupTime()).isEqualTo(UPDATED_DEFAULT_WARMUP_TIME);
        assertThat(testUserSettings.getDefaultPreWorkoutTime()).isEqualTo(UPDATED_DEFAULT_PRE_WORKOUT_TIME);
        assertThat(testUserSettings.getDefaultSetCount()).isEqualTo(UPDATED_DEFAULT_SET_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSettings() throws Exception {
        int databaseSizeBeforeUpdate = userSettingsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserSettingsMockMvc.perform(put("/api/user-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userSettings)))
            .andExpect(status().isBadRequest());

        // Validate the UserSettings in the database
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserSettings() throws Exception {
        // Initialize the database
        userSettingsRepository.saveAndFlush(userSettings);

        int databaseSizeBeforeDelete = userSettingsRepository.findAll().size();

        // Delete the userSettings
        restUserSettingsMockMvc.perform(delete("/api/user-settings/{id}", userSettings.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserSettings> userSettingsList = userSettingsRepository.findAll();
        assertThat(userSettingsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
