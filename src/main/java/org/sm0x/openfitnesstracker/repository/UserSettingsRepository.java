package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.UserSettings;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserSettings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
}
