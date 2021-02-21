package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.Unit;
import org.sm0x.openfitnesstracker.repository.UnitRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.Unit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UnitResource {

    private final Logger log = LoggerFactory.getLogger(UnitResource.class);

    private static final String ENTITY_NAME = "unit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UnitRepository unitRepository;

    public UnitResource(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    /**
     * {@code POST  /units} : Create a new unit.
     *
     * @param unit the unit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new unit, or with status {@code 400 (Bad Request)} if the unit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/units")
    public ResponseEntity<Unit> createUnit(@RequestBody Unit unit) throws URISyntaxException {
        log.debug("REST request to save Unit : {}", unit);
        if (unit.getId() != null) {
            throw new BadRequestAlertException("A new unit cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            throw new BadRequestAlertException("Only an administrator is allowed to create a unit", ENTITY_NAME, "notadmin");          
        }

        Unit result = unitRepository.save(unit);
        return ResponseEntity.created(new URI("/api/units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /units} : Updates an existing unit.
     *
     * @param unit the unit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated unit,
     * or with status {@code 400 (Bad Request)} if the unit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the unit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/units")
    public ResponseEntity<Unit> updateUnit(@RequestBody Unit unit) throws URISyntaxException {
        log.debug("REST request to update Unit : {}", unit);
        if (unit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            throw new BadRequestAlertException("Only an administrator is allowed to change a unit", ENTITY_NAME, "notadmin");          
        }

        Unit result = unitRepository.save(unit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /units} : get all the units.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of units in body.
     */
    @GetMapping("/units")
    public List<Unit> getAllUnits() {
        log.debug("REST request to get all Units");
        return unitRepository.findAll();
    }

    /**
     * {@code GET  /units/:id} : get the "id" unit.
     *
     * @param id the id of the unit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the unit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/units/{id}")
    public ResponseEntity<Unit> getUnit(@PathVariable Long id) {
        log.debug("REST request to get Unit : {}", id);
        Optional<Unit> unit = unitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unit);
    }

    /**
     * {@code DELETE  /units/:id} : delete the "id" unit.
     *
     * @param id the id of the unit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/units/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Long id) {
        log.debug("REST request to delete Unit : {}", id);
        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            throw new BadRequestAlertException("Only an administrator is allowed to delete a unit", ENTITY_NAME, "notadmin");          
        }
        unitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
