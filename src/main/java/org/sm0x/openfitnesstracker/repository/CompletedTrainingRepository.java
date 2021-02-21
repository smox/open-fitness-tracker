package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.CompletedTraining;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the CompletedTraining entity.
 */
@Repository
public interface CompletedTrainingRepository extends JpaRepository<CompletedTraining, Long> {

    @Query("select completedTraining from CompletedTraining completedTraining where completedTraining.user.login = ?#{principal.username}")
    List<CompletedTraining> findByUserIsCurrentUser();

    @Query("select completedTraining from CompletedTraining completedTraining where completedTraining.user.login = ?#{principal.username} and completedTraining.id = ?1")
    Optional<CompletedTraining> findByUserIsCurrentUserAndId(Long id);
}
