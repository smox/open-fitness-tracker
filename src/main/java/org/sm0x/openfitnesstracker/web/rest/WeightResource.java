package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.Weight;
import org.sm0x.openfitnesstracker.repository.WeightRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.Weight}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WeightResource {

    private final Logger log = LoggerFactory.getLogger(WeightResource.class);

    private static final String ENTITY_NAME = "weight";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WeightRepository weightRepository;

    public WeightResource(WeightRepository weightRepository) {
        this.weightRepository = weightRepository;
    }

    /**
     * {@code POST  /weights} : Create a new weight.
     *
     * @param weight the weight to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new weight, or with status {@code 400 (Bad Request)} if the weight has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/weights")
    public ResponseEntity<Weight> createWeight(@RequestBody Weight weight) throws URISyntaxException {
        log.debug("REST request to save Weight : {}", weight);
        if (weight.getId() != null) {
            throw new BadRequestAlertException("A new weight cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Weight result = weightRepository.save(weight);
        return ResponseEntity.created(new URI("/api/weights/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /weights} : Updates an existing weight.
     *
     * @param weight the weight to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated weight,
     * or with status {@code 400 (Bad Request)} if the weight is not valid,
     * or with status {@code 500 (Internal Server Error)} if the weight couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/weights")
    public ResponseEntity<Weight> updateWeight(@RequestBody Weight weight) throws URISyntaxException {
        log.debug("REST request to update Weight : {}", weight);
        if (weight.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Weight result = weightRepository.save(weight);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, weight.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /weights} : get all the weights.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of weights in body.
     */
    @GetMapping("/weights")
    public List<Weight> getAllWeights(@RequestParam(required = false) String filter) {
        if ("targetweight-is-null".equals(filter)) {
            log.debug("REST request to get all Weights where targetWeight is null");
            return StreamSupport
                .stream(weightRepository.findAll().spliterator(), false)
                .filter(weight -> weight.getTargetWeight() == null)
                .collect(Collectors.toList());
        }
        if ("protocolledweight-is-null".equals(filter)) {
            log.debug("REST request to get all Weights where protocolledWeight is null");
            return StreamSupport
                .stream(weightRepository.findAll().spliterator(), false)
                .filter(weight -> weight.getProtocolledWeight() == null)
                .collect(Collectors.toList());
        }
        if ("completedset-is-null".equals(filter)) {
            log.debug("REST request to get all Weights where completedSet is null");
            return StreamSupport
                .stream(weightRepository.findAll().spliterator(), false)
                .filter(weight -> weight.getCompletedSet() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Weights");
        return weightRepository.findAll();
    }

    /**
     * {@code GET  /weights/:id} : get the "id" weight.
     *
     * @param id the id of the weight to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the weight, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/weights/{id}")
    public ResponseEntity<Weight> getWeight(@PathVariable Long id) {
        log.debug("REST request to get Weight : {}", id);
        Optional<Weight> weight = weightRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(weight);
    }

    /**
     * {@code DELETE  /weights/:id} : delete the "id" weight.
     *
     * @param id the id of the weight to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/weights/{id}")
    public ResponseEntity<Void> deleteWeight(@PathVariable Long id) {
        log.debug("REST request to delete Weight : {}", id);
        weightRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
