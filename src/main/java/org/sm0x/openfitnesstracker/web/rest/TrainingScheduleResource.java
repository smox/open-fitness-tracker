package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.TrainingSchedule;
import org.sm0x.openfitnesstracker.repository.TrainingScheduleRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.TrainingSchedule}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TrainingScheduleResource {

    private final Logger log = LoggerFactory.getLogger(TrainingScheduleResource.class);

    private static final String ENTITY_NAME = "trainingSchedule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrainingScheduleRepository trainingScheduleRepository;

    public TrainingScheduleResource(TrainingScheduleRepository trainingScheduleRepository) {
        this.trainingScheduleRepository = trainingScheduleRepository;
    }

    /**
     * {@code POST  /training-schedules} : Create a new trainingSchedule.
     *
     * @param trainingSchedule the trainingSchedule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trainingSchedule, or with status {@code 400 (Bad Request)} if the trainingSchedule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/training-schedules")
    public ResponseEntity<TrainingSchedule> createTrainingSchedule(@RequestBody TrainingSchedule trainingSchedule) throws URISyntaxException {
        log.debug("REST request to save TrainingSchedule : {}", trainingSchedule);
        if (trainingSchedule.getId() != null) {
            throw new BadRequestAlertException("A new trainingSchedule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrainingSchedule result = trainingScheduleRepository.save(trainingSchedule);
        return ResponseEntity.created(new URI("/api/training-schedules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /training-schedules} : Updates an existing trainingSchedule.
     *
     * @param trainingSchedule the trainingSchedule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trainingSchedule,
     * or with status {@code 400 (Bad Request)} if the trainingSchedule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trainingSchedule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/training-schedules")
    public ResponseEntity<TrainingSchedule> updateTrainingSchedule(@RequestBody TrainingSchedule trainingSchedule) throws URISyntaxException {
        log.debug("REST request to update TrainingSchedule : {}", trainingSchedule);
        if (trainingSchedule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrainingSchedule result = trainingScheduleRepository.save(trainingSchedule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trainingSchedule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /training-schedules} : get all the trainingSchedules.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trainingSchedules in body.
     */
    @GetMapping("/training-schedules")
    public List<TrainingSchedule> getAllTrainingSchedules(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all TrainingSchedules");
        return trainingScheduleRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /training-schedules/:id} : get the "id" trainingSchedule.
     *
     * @param id the id of the trainingSchedule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trainingSchedule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/training-schedules/{id}")
    public ResponseEntity<TrainingSchedule> getTrainingSchedule(@PathVariable Long id) {
        log.debug("REST request to get TrainingSchedule : {}", id);
        Optional<TrainingSchedule> trainingSchedule = trainingScheduleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(trainingSchedule);
    }

    /**
     * {@code DELETE  /training-schedules/:id} : delete the "id" trainingSchedule.
     *
     * @param id the id of the trainingSchedule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/training-schedules/{id}")
    public ResponseEntity<Void> deleteTrainingSchedule(@PathVariable Long id) {
        log.debug("REST request to delete TrainingSchedule : {}", id);
        trainingScheduleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
