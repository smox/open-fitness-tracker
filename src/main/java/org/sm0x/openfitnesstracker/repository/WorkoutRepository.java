package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.Workout;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Workout entity.
 */
@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("select workout from Workout workout where workout.user.login = ?#{principal.username}")
    List<Workout> findByUserIsCurrentUser();

    @Query("select workout from Workout workout where workout.user.login = ?#{principal.username} and workout.id = ?1")
	Optional<Workout> findByUserIsCurrentUserAndId(Long id);
}
