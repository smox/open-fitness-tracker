package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.ProtocolledWeight;
import org.sm0x.openfitnesstracker.repository.ProtocolledWeightRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.ProtocolledWeight}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProtocolledWeightResource {

    private final Logger log = LoggerFactory.getLogger(ProtocolledWeightResource.class);

    private static final String ENTITY_NAME = "protocolledWeight";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRepository userRepository;

    private final ProtocolledWeightRepository protocolledWeightRepository;

    public ProtocolledWeightResource(UserRepository userRepository, ProtocolledWeightRepository protocolledWeightRepository) {
        this.userRepository = userRepository;
        this.protocolledWeightRepository = protocolledWeightRepository;
    }

    /**
     * {@code POST  /protocolled-weights} : Create a new protocolledWeight.
     *
     * @param protocolledWeight the protocolledWeight to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new protocolledWeight, or with status {@code 400 (Bad Request)} if the protocolledWeight has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/protocolled-weights")
    public ResponseEntity<ProtocolledWeight> createProtocolledWeight(@RequestBody ProtocolledWeight protocolledWeight) throws URISyntaxException {
        log.debug("REST request to save ProtocolledWeight : {}", protocolledWeight);

        if (protocolledWeight.getId() != null) {
            throw new BadRequestAlertException("A new protocolledWeight cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            protocolledWeight.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(protocolledWeight.getUser() == null) {
            throw new BadRequestAlertException("ProtocolledWeight must be assigned to a User", ENTITY_NAME, "userNull");
        }

        ProtocolledWeight result = protocolledWeightRepository.save(protocolledWeight);
        return ResponseEntity.created(new URI("/api/protocolled-weights/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /protocolled-weights} : Updates an existing protocolledWeight.
     *
     * @param protocolledWeight the protocolledWeight to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated protocolledWeight,
     * or with status {@code 400 (Bad Request)} if the protocolledWeight is not valid,
     * or with status {@code 500 (Internal Server Error)} if the protocolledWeight couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/protocolled-weights")
    public ResponseEntity<ProtocolledWeight> updateProtocolledWeight(@RequestBody ProtocolledWeight protocolledWeight) throws URISyntaxException {
        log.debug("REST request to update ProtocolledWeight : {}", protocolledWeight);
        if (protocolledWeight.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            protocolledWeight.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(protocolledWeight.getUser() == null) {
            throw new BadRequestAlertException("ProtocolledWeight must be assigned to a User", ENTITY_NAME, "userNull");
        }

        ProtocolledWeight result = protocolledWeightRepository.save(protocolledWeight);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, protocolledWeight.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /protocolled-weights} : get all the protocolledWeights.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of protocolledWeights in body.
     */
    @GetMapping("/protocolled-weights")
    public List<ProtocolledWeight> getAllProtocolledWeights() {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to get all ProtocolledWeights");
            return protocolledWeightRepository.findAll();
        } else {
            log.debug("REST request to get all ProtocolledWeights by current user");
            List<ProtocolledWeight> findByUserIsCurrentUser = protocolledWeightRepository.findByUserIsCurrentUser();
            findByUserIsCurrentUser.forEach((ProtocolledWeight pw) -> System.out.println(pw.getTime()));
            return findByUserIsCurrentUser;
        }
    }

    /**
     * {@code GET  /protocolled-weights/:id} : get the "id" protocolledWeight.
     *
     * @param id the id of the protocolledWeight to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the protocolledWeight, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/protocolled-weights/{id}")
    public ResponseEntity<ProtocolledWeight> getProtocolledWeight(@PathVariable Long id) {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST admin request to get ProtocolledWeight : {}", id);
            return ResponseUtil.wrapOrNotFound(protocolledWeightRepository.findById(id));
        } else {
            log.debug("REST request to get ProtocolledWeight : {}", id);
            return ResponseUtil.wrapOrNotFound(protocolledWeightRepository.findByUserIsCurrentUserAndId(id));
        }
    }

    /**
     * {@code DELETE  /protocolled-weights/:id} : delete the "id" protocolledWeight.
     *
     * @param id the id of the protocolledWeight to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/protocolled-weights/{id}")
    public ResponseEntity<Void> deleteProtocolledWeight(@PathVariable Long id) {

        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to delete ProtocolledWeight : {}", id);
            protocolledWeightRepository.deleteById(id);
        } else {
            log.debug("REST request to delete ProtocolledWeight for current user : {}", id);
            Optional<ProtocolledWeight> findById = protocolledWeightRepository.findById(id);
            if(findById.isPresent() && SecurityUtils.getCurrentUserLogin().isPresent() && 
                findById.get().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get())) {
                    protocolledWeightRepository.deleteById(findById.get().getId());
            }
        }

        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
