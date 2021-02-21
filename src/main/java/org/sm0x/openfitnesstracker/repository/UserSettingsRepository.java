package org.sm0x.openfitnesstracker.repository;

import java.util.List;
import java.util.Optional;

import org.sm0x.openfitnesstracker.domain.UserSettings;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserSettings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {

    @Query("select userSettings from UserSettings userSettings where userSettings.user.login = ?#{principal.username}")
    List<UserSettings> findByUserIsCurrentUser();

    @Query("select userSettings from UserSettings userSettings where userSettings.user.login = ?#{principal.username} and userSettings.id = ?1")
	Optional<UserSettings> findByUserIsCurrentUserAndId(Long id);

}
