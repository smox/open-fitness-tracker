package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.Nutrition;
import org.sm0x.openfitnesstracker.repository.NutritionRepository;
import org.sm0x.openfitnesstracker.repository.UserRepository;
import org.sm0x.openfitnesstracker.security.AuthoritiesConstants;
import org.sm0x.openfitnesstracker.security.SecurityUtils;
import org.sm0x.openfitnesstracker.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.Nutrition}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NutritionResource {

    private final Logger log = LoggerFactory.getLogger(NutritionResource.class);

    private static final String ENTITY_NAME = "nutrition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRepository userRepository;

    private final NutritionRepository nutritionRepository;

    public NutritionResource(UserRepository userRepository, NutritionRepository nutritionRepository) {
        this.userRepository = userRepository;
        this.nutritionRepository = nutritionRepository;
    }

    /**
     * {@code POST  /nutritions} : Create a new nutrition.
     *
     * @param nutrition the nutrition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutrition, or with status {@code 400 (Bad Request)} if the nutrition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutritions")
    public ResponseEntity<Nutrition> createNutrition(@RequestBody Nutrition nutrition) throws URISyntaxException {
        log.debug("REST request to save Nutrition : {}", nutrition);
        if (nutrition.getId() != null) {
            throw new BadRequestAlertException("A new nutrition cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            nutrition.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(nutrition.getUser() == null) {
            throw new BadRequestAlertException("Nutrition must be assigned to a User", ENTITY_NAME, "userNull");
        }

        Nutrition result = nutritionRepository.save(nutrition);
        return ResponseEntity.created(new URI("/api/nutritions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutritions} : Updates an existing nutrition.
     *
     * @param nutrition the nutrition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutrition,
     * or with status {@code 400 (Bad Request)} if the nutrition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutrition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutritions")
    public ResponseEntity<Nutrition> updateNutrition(@RequestBody Nutrition nutrition) throws URISyntaxException {
        log.debug("REST request to update Nutrition : {}", nutrition);
        if (nutrition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            nutrition.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(nutrition.getUser() == null) {
            throw new BadRequestAlertException("Nutrition must be assigned to a User", ENTITY_NAME, "userNull");
        }
        
        Nutrition result = nutritionRepository.save(nutrition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutrition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nutritions} : get all the nutritions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutritions in body.
     */
    @GetMapping("/nutritions")
    public List<Nutrition> getAllNutritions() {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to get all Nutritions");
            return nutritionRepository.findAll();
        } else {
            log.debug("REST request to get all Nutritions by current user");
            return nutritionRepository.findByUserIsCurrentUser();
        }
    }

    /**
     * {@code GET  /nutritions/:id} : get the "id" nutrition.
     *
     * @param id the id of the nutrition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutrition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutritions/{id}")
    public ResponseEntity<Nutrition> getNutrition(@PathVariable Long id) {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST admin request to get Nutrition : {}", id);
            return ResponseUtil.wrapOrNotFound(nutritionRepository.findById(id));
        } else {
            log.debug("REST request to get Nutritions : {}", id);
            return ResponseUtil.wrapOrNotFound(nutritionRepository.findByUserIsCurrentUserAndId(id));
        }
    }

    /**
     * {@code DELETE  /nutritions/:id} : delete the "id" nutrition.
     *
     * @param id the id of the nutrition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nutritions/{id}")
    public ResponseEntity<Void> deleteNutrition(@PathVariable Long id) {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to delete Nutrition : {}", id);
            nutritionRepository.deleteById(id);
        } else {
            log.debug("REST request to delete Nutrition for current user : {}", id);
            Optional<Nutrition> findById = nutritionRepository.findById(id);
            if(findById.isPresent() && SecurityUtils.getCurrentUserLogin().isPresent() && 
                findById.get().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get())) {
                    nutritionRepository.deleteById(findById.get().getId());
            }
        }
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
