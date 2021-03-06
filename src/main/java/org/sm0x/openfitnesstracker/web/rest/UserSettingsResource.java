package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.domain.UserSettings;
import org.sm0x.openfitnesstracker.repository.UserRepository;
import org.sm0x.openfitnesstracker.repository.UserSettingsRepository;
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
 * REST controller for managing {@link org.sm0x.openfitnesstracker.domain.UserSettings}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserSettingsResource {

    private final Logger log = LoggerFactory.getLogger(UserSettingsResource.class);

    private static final String ENTITY_NAME = "userSettings";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRepository userRepository;

    private final UserSettingsRepository userSettingsRepository;

    public UserSettingsResource(UserRepository userRepository, UserSettingsRepository userSettingsRepository) {
        this.userRepository = userRepository;
        this.userSettingsRepository = userSettingsRepository;
    }

    /**
     * {@code POST  /user-settings} : Create a new userSettings.
     *
     * @param userSettings the userSettings to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userSettings, or with status {@code 400 (Bad Request)} if the userSettings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-settings")
    public ResponseEntity<UserSettings> createUserSettings(@RequestBody UserSettings userSettings) throws URISyntaxException {
        log.debug("REST request to save UserSettings : {}", userSettings);
        if (userSettings.getId() != null) {
            throw new BadRequestAlertException("A new userSettings cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            userSettings.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(userSettings.getUser() == null) {
            throw new BadRequestAlertException("UserSettings must be assigned to a User", ENTITY_NAME, "userNull");
        }
        
        UserSettings result = userSettingsRepository.save(userSettings);
        return ResponseEntity.created(new URI("/api/user-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-settings} : Updates an existing userSettings.
     *
     * @param userSettings the userSettings to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userSettings,
     * or with status {@code 400 (Bad Request)} if the userSettings is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userSettings couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-settings")
    public ResponseEntity<UserSettings> updateUserSettings(@RequestBody UserSettings userSettings) throws URISyntaxException {
        log.debug("REST request to update UserSettings : {}", userSettings);
        if (userSettings.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            userSettings.setUser(SecurityUtils.getCurrentUser(userRepository));            
        }

        if(userSettings.getUser() == null) {
            throw new BadRequestAlertException("UserSettings must be assigned to a User", ENTITY_NAME, "userNull");
        }

        UserSettings result = userSettingsRepository.save(userSettings);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userSettings.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-settings} : get all the userSettings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userSettings in body.
     */
    @GetMapping("/user-settings")
    public List<UserSettings> getAllUserSettings() {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to get all UserSettings");
            return userSettingsRepository.findAll();
        } else {
            log.debug("REST request to get all UserSettings by current user");
            return userSettingsRepository.findByUserIsCurrentUser();
        }
    }

    /**
     * {@code GET  /user-settings/:id} : get the "id" userSettings.
     *
     * @param id the id of the userSettings to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userSettings, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-settings/{id}")
    public ResponseEntity<UserSettings> getUserSettings(@PathVariable Long id) {
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST admin request to get UserSettings : {}", id);
            return ResponseUtil.wrapOrNotFound(userSettingsRepository.findById(id));
        } else {
            log.debug("REST request to get UserSettings : {}", id);
            return ResponseUtil.wrapOrNotFound(userSettingsRepository.findByUserIsCurrentUserAndId(id));
        }
    }

    /**
     * {@code DELETE  /user-settings/:id} : delete the "id" userSettings.
     *
     * @param id the id of the userSettings to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-settings/{id}")
    public ResponseEntity<Void> deleteUserSettings(@PathVariable Long id) {

        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("REST request to delete UserSettings : {}", id);
            userSettingsRepository.deleteById(id);
        } else {
            log.debug("REST request to delete UserSettings for current user : {}", id);
            Optional<UserSettings> findById = userSettingsRepository.findById(id);
            if(findById.isPresent() && SecurityUtils.getCurrentUserLogin().isPresent() && 
                findById.get().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get())) {
                    userSettingsRepository.deleteById(findById.get().getId());
            }
        }

        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
