package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.ApplicationSettings;
import org.sm0x.openfitnesstracker.repository.ApplicationSettingsRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.ApplicationSettings}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ApplicationSettingsResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationSettingsResource.class);

    private static final String ENTITY_NAME = "applicationSettings";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ApplicationSettingsRepository applicationSettingsRepository;

    public ApplicationSettingsResource(ApplicationSettingsRepository applicationSettingsRepository) {
        this.applicationSettingsRepository = applicationSettingsRepository;
    }

    /**
     * {@code POST  /application-settings} : Create a new applicationSettings.
     *
     * @param applicationSettings the applicationSettings to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new applicationSettings, or with status {@code 400 (Bad Request)} if the applicationSettings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/application-settings")
    public ResponseEntity<ApplicationSettings> createApplicationSettings(@RequestBody ApplicationSettings applicationSettings) throws URISyntaxException {
        log.debug("REST request to save ApplicationSettings : {}", applicationSettings);
        if (applicationSettings.getId() != null) {
            throw new BadRequestAlertException("A new applicationSettings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApplicationSettings result = applicationSettingsRepository.save(applicationSettings);
        return ResponseEntity.created(new URI("/api/application-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /application-settings} : Updates an existing applicationSettings.
     *
     * @param applicationSettings the applicationSettings to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated applicationSettings,
     * or with status {@code 400 (Bad Request)} if the applicationSettings is not valid,
     * or with status {@code 500 (Internal Server Error)} if the applicationSettings couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/application-settings")
    public ResponseEntity<ApplicationSettings> updateApplicationSettings(@RequestBody ApplicationSettings applicationSettings) throws URISyntaxException {
        log.debug("REST request to update ApplicationSettings : {}", applicationSettings);
        if (applicationSettings.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApplicationSettings result = applicationSettingsRepository.save(applicationSettings);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, applicationSettings.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /application-settings} : get all the applicationSettings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of applicationSettings in body.
     */
    @GetMapping("/application-settings")
    public List<ApplicationSettings> getAllApplicationSettings() {
        log.debug("REST request to get all ApplicationSettings");
        return applicationSettingsRepository.findAll();
    }

    /**
     * {@code GET  /application-settings/:id} : get the "id" applicationSettings.
     *
     * @param id the id of the applicationSettings to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the applicationSettings, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/application-settings/{id}")
    public ResponseEntity<ApplicationSettings> getApplicationSettings(@PathVariable Long id) {
        log.debug("REST request to get ApplicationSettings : {}", id);
        Optional<ApplicationSettings> applicationSettings = applicationSettingsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(applicationSettings);
    }

    /**
     * {@code DELETE  /application-settings/:id} : delete the "id" applicationSettings.
     *
     * @param id the id of the applicationSettings to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/application-settings/{id}")
    public ResponseEntity<Void> deleteApplicationSettings(@PathVariable Long id) {
        log.debug("REST request to delete ApplicationSettings : {}", id);
        applicationSettingsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
