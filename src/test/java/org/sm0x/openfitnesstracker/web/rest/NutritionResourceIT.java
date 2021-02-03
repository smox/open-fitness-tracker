package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.Nutrition;
import org.sm0x.openfitnesstracker.repository.NutritionRepository;

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
import java.math.BigDecimal;
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
 * Integration tests for the {@link NutritionResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class NutritionResourceIT {

    private static final ZonedDateTime DEFAULT_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final BigDecimal DEFAULT_CARBS = new BigDecimal(1);
    private static final BigDecimal UPDATED_CARBS = new BigDecimal(2);

    private static final BigDecimal DEFAULT_FAT = new BigDecimal(1);
    private static final BigDecimal UPDATED_FAT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PROTEIN = new BigDecimal(1);
    private static final BigDecimal UPDATED_PROTEIN = new BigDecimal(2);

    private static final BigDecimal DEFAULT_FIBER = new BigDecimal(1);
    private static final BigDecimal UPDATED_FIBER = new BigDecimal(2);

    private static final BigDecimal DEFAULT_KCAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_KCAL = new BigDecimal(2);

    @Autowired
    private NutritionRepository nutritionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNutritionMockMvc;

    private Nutrition nutrition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutrition createEntity(EntityManager em) {
        Nutrition nutrition = new Nutrition()
            .time(DEFAULT_TIME)
            .carbs(DEFAULT_CARBS)
            .fat(DEFAULT_FAT)
            .protein(DEFAULT_PROTEIN)
            .fiber(DEFAULT_FIBER)
            .kcal(DEFAULT_KCAL);
        return nutrition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutrition createUpdatedEntity(EntityManager em) {
        Nutrition nutrition = new Nutrition()
            .time(UPDATED_TIME)
            .carbs(UPDATED_CARBS)
            .fat(UPDATED_FAT)
            .protein(UPDATED_PROTEIN)
            .fiber(UPDATED_FIBER)
            .kcal(UPDATED_KCAL);
        return nutrition;
    }

    @BeforeEach
    public void initTest() {
        nutrition = createEntity(em);
    }

    @Test
    @Transactional
    public void createNutrition() throws Exception {
        int databaseSizeBeforeCreate = nutritionRepository.findAll().size();
        // Create the Nutrition
        restNutritionMockMvc.perform(post("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isCreated());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeCreate + 1);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testNutrition.getCarbs()).isEqualTo(DEFAULT_CARBS);
        assertThat(testNutrition.getFat()).isEqualTo(DEFAULT_FAT);
        assertThat(testNutrition.getProtein()).isEqualTo(DEFAULT_PROTEIN);
        assertThat(testNutrition.getFiber()).isEqualTo(DEFAULT_FIBER);
        assertThat(testNutrition.getKcal()).isEqualTo(DEFAULT_KCAL);
    }

    @Test
    @Transactional
    public void createNutritionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nutritionRepository.findAll().size();

        // Create the Nutrition with an existing ID
        nutrition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionMockMvc.perform(post("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNutritions() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        // Get all the nutritionList
        restNutritionMockMvc.perform(get("/api/nutritions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutrition.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(sameInstant(DEFAULT_TIME))))
            .andExpect(jsonPath("$.[*].carbs").value(hasItem(DEFAULT_CARBS.intValue())))
            .andExpect(jsonPath("$.[*].fat").value(hasItem(DEFAULT_FAT.intValue())))
            .andExpect(jsonPath("$.[*].protein").value(hasItem(DEFAULT_PROTEIN.intValue())))
            .andExpect(jsonPath("$.[*].fiber").value(hasItem(DEFAULT_FIBER.intValue())))
            .andExpect(jsonPath("$.[*].kcal").value(hasItem(DEFAULT_KCAL.intValue())));
    }
    
    @Test
    @Transactional
    public void getNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        // Get the nutrition
        restNutritionMockMvc.perform(get("/api/nutritions/{id}", nutrition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nutrition.getId().intValue()))
            .andExpect(jsonPath("$.time").value(sameInstant(DEFAULT_TIME)))
            .andExpect(jsonPath("$.carbs").value(DEFAULT_CARBS.intValue()))
            .andExpect(jsonPath("$.fat").value(DEFAULT_FAT.intValue()))
            .andExpect(jsonPath("$.protein").value(DEFAULT_PROTEIN.intValue()))
            .andExpect(jsonPath("$.fiber").value(DEFAULT_FIBER.intValue()))
            .andExpect(jsonPath("$.kcal").value(DEFAULT_KCAL.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingNutrition() throws Exception {
        // Get the nutrition
        restNutritionMockMvc.perform(get("/api/nutritions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();

        // Update the nutrition
        Nutrition updatedNutrition = nutritionRepository.findById(nutrition.getId()).get();
        // Disconnect from session so that the updates on updatedNutrition are not directly saved in db
        em.detach(updatedNutrition);
        updatedNutrition
            .time(UPDATED_TIME)
            .carbs(UPDATED_CARBS)
            .fat(UPDATED_FAT)
            .protein(UPDATED_PROTEIN)
            .fiber(UPDATED_FIBER)
            .kcal(UPDATED_KCAL);

        restNutritionMockMvc.perform(put("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNutrition)))
            .andExpect(status().isOk());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testNutrition.getCarbs()).isEqualTo(UPDATED_CARBS);
        assertThat(testNutrition.getFat()).isEqualTo(UPDATED_FAT);
        assertThat(testNutrition.getProtein()).isEqualTo(UPDATED_PROTEIN);
        assertThat(testNutrition.getFiber()).isEqualTo(UPDATED_FIBER);
        assertThat(testNutrition.getKcal()).isEqualTo(UPDATED_KCAL);
    }

    @Test
    @Transactional
    public void updateNonExistingNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionMockMvc.perform(put("/api/nutritions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeDelete = nutritionRepository.findAll().size();

        // Delete the nutrition
        restNutritionMockMvc.perform(delete("/api/nutritions/{id}", nutrition.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
