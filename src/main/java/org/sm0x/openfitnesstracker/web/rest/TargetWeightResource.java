package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.TargetWeight;
import org.sm0x.openfitnesstracker.repository.TargetWeightRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.TargetWeight}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TargetWeightResource {

    private final Logger log = LoggerFactory.getLogger(TargetWeightResource.class);

    private static final String ENTITY_NAME = "targetWeight";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TargetWeightRepository targetWeightRepository;

    public TargetWeightResource(TargetWeightRepository targetWeightRepository) {
        this.targetWeightRepository = targetWeightRepository;
    }

    /**
     * {@code POST  /target-weights} : Create a new targetWeight.
     *
     * @param targetWeight the targetWeight to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new targetWeight, or with status {@code 400 (Bad Request)} if the targetWeight has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/target-weights")
    public ResponseEntity<TargetWeight> createTargetWeight(@RequestBody TargetWeight targetWeight) throws URISyntaxException {
        log.debug("REST request to save TargetWeight : {}", targetWeight);
        if (targetWeight.getId() != null) {
            throw new BadRequestAlertException("A new targetWeight cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TargetWeight result = targetWeightRepository.save(targetWeight);
        return ResponseEntity.created(new URI("/api/target-weights/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /target-weights} : Updates an existing targetWeight.
     *
     * @param targetWeight the targetWeight to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated targetWeight,
     * or with status {@code 400 (Bad Request)} if the targetWeight is not valid,
     * or with status {@code 500 (Internal Server Error)} if the targetWeight couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/target-weights")
    public ResponseEntity<TargetWeight> updateTargetWeight(@RequestBody TargetWeight targetWeight) throws URISyntaxException {
        log.debug("REST request to update TargetWeight : {}", targetWeight);
        if (targetWeight.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TargetWeight result = targetWeightRepository.save(targetWeight);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, targetWeight.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /target-weights} : get all the targetWeights.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of targetWeights in body.
     */
    @GetMapping("/target-weights")
    public List<TargetWeight> getAllTargetWeights() {
        log.debug("REST request to get all TargetWeights");
        return targetWeightRepository.findAll();
    }

    /**
     * {@code GET  /target-weights/:id} : get the "id" targetWeight.
     *
     * @param id the id of the targetWeight to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the targetWeight, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/target-weights/{id}")
    public ResponseEntity<TargetWeight> getTargetWeight(@PathVariable Long id) {
        log.debug("REST request to get TargetWeight : {}", id);
        Optional<TargetWeight> targetWeight = targetWeightRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(targetWeight);
    }

    /**
     * {@code DELETE  /target-weights/:id} : delete the "id" targetWeight.
     *
     * @param id the id of the targetWeight to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/target-weights/{id}")
    public ResponseEntity<Void> deleteTargetWeight(@PathVariable Long id) {
        log.debug("REST request to delete TargetWeight : {}", id);
        targetWeightRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
