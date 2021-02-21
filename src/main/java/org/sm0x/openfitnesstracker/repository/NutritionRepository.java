package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.Nutrition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the Nutrition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionRepository extends JpaRepository<Nutrition, Long> {

    @Query("select nutrition from Nutrition nutrition where nutrition.user.login = ?#{principal.username}")
    List<Nutrition> findByUserIsCurrentUser();

    @Query("select nutrition from Nutrition nutrition where nutrition.user.login = ?#{principal.username} and nutrition.id = ?1")
    Optional<Nutrition> findByUserIsCurrentUserAndId(Long id);
}
