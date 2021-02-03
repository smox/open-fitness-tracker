package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.Workout;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Workout entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("select workout from Workout workout where workout.user.login = ?#{principal.username}")
    List<Workout> findByUserIsCurrentUser();
}
