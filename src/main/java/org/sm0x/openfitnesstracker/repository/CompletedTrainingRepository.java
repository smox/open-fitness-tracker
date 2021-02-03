package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.CompletedTraining;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the CompletedTraining entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompletedTrainingRepository extends JpaRepository<CompletedTraining, Long> {

    @Query("select completedTraining from CompletedTraining completedTraining where completedTraining.user.login = ?#{principal.username}")
    List<CompletedTraining> findByUserIsCurrentUser();
}
