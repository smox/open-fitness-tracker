package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.Workout;
import org.sm0x.openfitnesstracker.repository.WorkoutRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.Workout}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WorkoutResource {

    private final Logger log = LoggerFactory.getLogger(WorkoutResource.class);

    private static final String ENTITY_NAME = "workout";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkoutRepository workoutRepository;

    public WorkoutResource(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    /**
     * {@code POST  /workouts} : Create a new workout.
     *
     * @param workout the workout to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workout, or with status {@code 400 (Bad Request)} if the workout has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/workouts")
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout) throws URISyntaxException {
        log.debug("REST request to save Workout : {}", workout);
        if (workout.getId() != null) {
            throw new BadRequestAlertException("A new workout cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Workout result = workoutRepository.save(workout);
        return ResponseEntity.created(new URI("/api/workouts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /workouts} : Updates an existing workout.
     *
     * @param workout the workout to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workout,
     * or with status {@code 400 (Bad Request)} if the workout is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workout couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/workouts")
    public ResponseEntity<Workout> updateWorkout(@RequestBody Workout workout) throws URISyntaxException {
        log.debug("REST request to update Workout : {}", workout);
        if (workout.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Workout result = workoutRepository.save(workout);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workout.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /workouts} : get all the workouts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of workouts in body.
     */
    @GetMapping("/workouts")
    public List<Workout> getAllWorkouts() {
        log.debug("REST request to get all Workouts");
        return workoutRepository.findAll();
    }

    /**
     * {@code GET  /workouts/:id} : get the "id" workout.
     *
     * @param id the id of the workout to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workout, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/workouts/{id}")
    public ResponseEntity<Workout> getWorkout(@PathVariable Long id) {
        log.debug("REST request to get Workout : {}", id);
        Optional<Workout> workout = workoutRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(workout);
    }

    /**
     * {@code DELETE  /workouts/:id} : delete the "id" workout.
     *
     * @param id the id of the workout to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/workouts/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        log.debug("REST request to delete Workout : {}", id);
        workoutRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
