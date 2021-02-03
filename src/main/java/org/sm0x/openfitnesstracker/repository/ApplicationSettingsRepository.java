package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.ApplicationSettings;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ApplicationSettings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationSettingsRepository extends JpaRepository<ApplicationSettings, Long> {
}
