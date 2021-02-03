package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.CompletedSet;
import org.sm0x.openfitnesstracker.repository.CompletedSetRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.CompletedSet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CompletedSetResource {

    private final Logger log = LoggerFactory.getLogger(CompletedSetResource.class);

    private static final String ENTITY_NAME = "completedSet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompletedSetRepository completedSetRepository;

    public CompletedSetResource(CompletedSetRepository completedSetRepository) {
        this.completedSetRepository = completedSetRepository;
    }

    /**
     * {@code POST  /completed-sets} : Create a new completedSet.
     *
     * @param completedSet the completedSet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new completedSet, or with status {@code 400 (Bad Request)} if the completedSet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/completed-sets")
    public ResponseEntity<CompletedSet> createCompletedSet(@RequestBody CompletedSet completedSet) throws URISyntaxException {
        log.debug("REST request to save CompletedSet : {}", completedSet);
        if (completedSet.getId() != null) {
            throw new BadRequestAlertException("A new completedSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompletedSet result = completedSetRepository.save(completedSet);
        return ResponseEntity.created(new URI("/api/completed-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /completed-sets} : Updates an existing completedSet.
     *
     * @param completedSet the completedSet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated completedSet,
     * or with status {@code 400 (Bad Request)} if the completedSet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the completedSet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/completed-sets")
    public ResponseEntity<CompletedSet> updateCompletedSet(@RequestBody CompletedSet completedSet) throws URISyntaxException {
        log.debug("REST request to update CompletedSet : {}", completedSet);
        if (completedSet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompletedSet result = completedSetRepository.save(completedSet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, completedSet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /completed-sets} : get all the completedSets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of completedSets in body.
     */
    @GetMapping("/completed-sets")
    public List<CompletedSet> getAllCompletedSets() {
        log.debug("REST request to get all CompletedSets");
        return completedSetRepository.findAll();
    }

    /**
     * {@code GET  /completed-sets/:id} : get the "id" completedSet.
     *
     * @param id the id of the completedSet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the completedSet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/completed-sets/{id}")
    public ResponseEntity<CompletedSet> getCompletedSet(@PathVariable Long id) {
        log.debug("REST request to get CompletedSet : {}", id);
        Optional<CompletedSet> completedSet = completedSetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(completedSet);
    }

    /**
     * {@code DELETE  /completed-sets/:id} : delete the "id" completedSet.
     *
     * @param id the id of the completedSet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/completed-sets/{id}")
    public ResponseEntity<Void> deleteCompletedSet(@PathVariable Long id) {
        log.debug("REST request to delete CompletedSet : {}", id);
        completedSetRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
