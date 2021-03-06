package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.TrainingUnit;
import org.sm0x.openfitnesstracker.repository.TrainingUnitRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.TrainingUnit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TrainingUnitResource {

    private final Logger log = LoggerFactory.getLogger(TrainingUnitResource.class);

    private static final String ENTITY_NAME = "trainingUnit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRepository userRepository;

    private final TrainingUnitRepository trainingUnitRepository;

    public TrainingUnitResource(UserRepository userRepository, TrainingUnitRepository trainingUnitRepository) {
        this.userRepository = userRepository;
        this.trainingUnitRepository = trainingUnitRepository;
    }

    /**
     * {@code POST  /training-units} : Create a new trainingUnit.
     *
     * @param trainingUnit the trainingUnit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trainingUnit, or with status {@code 400 (Bad Request)} if the trainingUnit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/training-units")
    public ResponseEntity<TrainingUnit> createTrainingUnit(@RequestBody TrainingUnit trainingUnit) throws URISyntaxException {
        log.debug("REST request to save TrainingUnit : {}", trainingUnit);
        if (trainingUnit.getId() != null) {
            throw new BadRequestAlertException("A new trainingUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            trainingUnit.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(trainingUnit.getUser() == null) {
            throw new BadRequestAlertException("TrainingUnit must be assigned to a User", ENTITY_NAME, "userNull");
        }
        
        TrainingUnit result = trainingUnitRepository.save(trainingUnit);
        return ResponseEntity.created(new URI("/api/training-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /training-units} : Updates an existing trainingUnit.
     *
     * @param trainingUnit the trainingUnit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trainingUnit,
     * or with status {@code 400 (Bad Request)} if the trainingUnit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trainingUnit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/training-units")
    public ResponseEntity<TrainingUnit> updateTrainingUnit(@RequestBody TrainingUnit trainingUnit) throws URISyntaxException {
        log.debug("REST request to update TrainingUnit : {}", trainingUnit);
        if (trainingUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            trainingUnit.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(trainingUnit.getUser() == null) {
            throw new BadRequestAlertException("TrainingUnit must be assigned to a User", ENTITY_NAME, "userNull");
        }

        TrainingUnit result = trainingUnitRepository.save(trainingUnit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trainingUnit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /training-units} : get all the trainingUnits.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trainingUnits in body.
     */
    @GetMapping("/training-units")
    public List<TrainingUnit> getAllTrainingUnits(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to get all trainingUnits");
            return trainingUnitRepository.findAllWithEagerRelationships();
        } else {
            log.debug("REST request to get all trainingUnits by current user");
            return trainingUnitRepository.findByUserIsCurrentUserWithEagerRelationships();
        }
    }

    /**
     * {@code GET  /training-units/:id} : get the "id" trainingUnit.
     *
     * @param id the id of the trainingUnit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trainingUnit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/training-units/{id}")
    public ResponseEntity<TrainingUnit> getTrainingUnit(@PathVariable Long id) {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST admin request to get TrainingUnit : {}", id);
            return ResponseUtil.wrapOrNotFound(trainingUnitRepository.findOneWithEagerRelationships(id));
        } else {
            log.debug("REST request to get TrainingUnit : {}", id);
            return ResponseUtil.wrapOrNotFound(trainingUnitRepository.findOneByUserIsCurrentUserAndIdWithEagerRelationships(id));
        }
    }

    /**
     * {@code DELETE  /training-units/:id} : delete the "id" trainingUnit.
     *
     * @param id the id of the trainingUnit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/training-units/{id}")
    public ResponseEntity<Void> deleteTrainingUnit(@PathVariable Long id) {
        
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to delete TrainingUnit : {}", id);
            trainingUnitRepository.deleteById(id);
        } else {
            log.debug("REST request to delete TrainingUnit for current user : {}", id);
            Optional<TrainingUnit> findById = trainingUnitRepository.findById(id);
            if(findById.isPresent() && SecurityUtils.getCurrentUserLogin().isPresent() && 
                findById.get().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get())) {
                    trainingUnitRepository.deleteById(findById.get().getId());
            }
        }

        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
