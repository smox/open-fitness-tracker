package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.TargetWeight;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TargetWeight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TargetWeightRepository extends JpaRepository<TargetWeight, Long> {

    @Query("select targetWeight from TargetWeight targetWeight where targetWeight.user.login = ?#{principal.username}")
    List<TargetWeight> findByUserIsCurrentUser();

    @Query("select targetWeight from TargetWeight targetWeight where targetWeight.user.login = ?#{principal.username} and targetWeight.id = ?1")
    Optional<TargetWeight> findByUserIsCurrentUserAndId(Long id);
}
