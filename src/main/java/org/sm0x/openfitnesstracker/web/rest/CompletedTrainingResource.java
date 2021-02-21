package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.CompletedTraining;
import org.sm0x.openfitnesstracker.repository.CompletedTrainingRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.CompletedTraining}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CompletedTrainingResource {

    private final Logger log = LoggerFactory.getLogger(CompletedTrainingResource.class);

    private static final String ENTITY_NAME = "completedTraining";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRepository userRepository;

    private final CompletedTrainingRepository completedTrainingRepository;

    public CompletedTrainingResource(UserRepository userRepository, CompletedTrainingRepository completedTrainingRepository) {
        this.userRepository = userRepository;
        this.completedTrainingRepository = completedTrainingRepository;
    }

    /**
     * {@code POST  /completed-trainings} : Create a new completedTraining.
     *
     * @param completedTraining the completedTraining to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new completedTraining, or with status {@code 400 (Bad Request)} if the completedTraining has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/completed-trainings")
    public ResponseEntity<CompletedTraining> createCompletedTraining(@RequestBody CompletedTraining completedTraining) throws URISyntaxException {
        log.debug("REST request to save CompletedTraining : {}", completedTraining);
        if (completedTraining.getId() != null) {
            throw new BadRequestAlertException("A new completedTraining cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            completedTraining.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(completedTraining.getUser() == null) {
            throw new BadRequestAlertException("CompletedTraining must be assigned to a User", ENTITY_NAME, "userNull");
        }

        CompletedTraining result = completedTrainingRepository.save(completedTraining);
        return ResponseEntity.created(new URI("/api/completed-trainings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /completed-trainings} : Updates an existing completedTraining.
     *
     * @param completedTraining the completedTraining to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated completedTraining,
     * or with status {@code 400 (Bad Request)} if the completedTraining is not valid,
     * or with status {@code 500 (Internal Server Error)} if the completedTraining couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/completed-trainings")
    public ResponseEntity<CompletedTraining> updateCompletedTraining(@RequestBody CompletedTraining completedTraining) throws URISyntaxException {
        log.debug("REST request to update CompletedTraining : {}", completedTraining);
        if (completedTraining.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            completedTraining.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(completedTraining.getUser() == null) {
            throw new BadRequestAlertException("CompletedTraining must be assigned to a User", ENTITY_NAME, "userNull");
        }

        CompletedTraining result = completedTrainingRepository.save(completedTraining);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, completedTraining.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /completed-trainings} : get all the completedTrainings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of completedTrainings in body.
     */
    @GetMapping("/completed-trainings")
    public List<CompletedTraining> getAllCompletedTrainings() {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to get all CompletedTrainings");
            return completedTrainingRepository.findAll();
        } else {
            log.debug("REST request to get all CompletedTrainings by current user");
            return completedTrainingRepository.findByUserIsCurrentUser();
        }
    }

    /**
     * {@code GET  /completed-trainings/:id} : get the "id" completedTraining.
     *
     * @param id the id of the completedTraining to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the completedTraining, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/completed-trainings/{id}")
    public ResponseEntity<CompletedTraining> getCompletedTraining(@PathVariable Long id) {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST admin request to get CompletedTraining : {}", id);
            return ResponseUtil.wrapOrNotFound(completedTrainingRepository.findById(id));
        } else {
            log.debug("REST request to get CompletedTraining : {}", id);
            return ResponseUtil.wrapOrNotFound(completedTrainingRepository.findByUserIsCurrentUserAndId(id));
        }
    }

    /**
     * {@code DELETE  /completed-trainings/:id} : delete the "id" completedTraining.
     *
     * @param id the id of the completedTraining to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/completed-trainings/{id}")
    public ResponseEntity<Void> deleteCompletedTraining(@PathVariable Long id) {

        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to delete CompletedTraining : {}", id);
            completedTrainingRepository.deleteById(id);
        } else {
            log.debug("REST request to delete CompletedTraining for current user : {}", id);
            Optional<CompletedTraining> findById = completedTrainingRepository.findById(id);
            if(findById.isPresent() && SecurityUtils.getCurrentUserLogin().isPresent() && 
                findById.get().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get())) {
                    completedTrainingRepository.deleteById(findById.get().getId());
            }
        }
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
