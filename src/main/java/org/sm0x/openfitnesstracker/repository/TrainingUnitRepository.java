package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.TrainingUnit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TrainingUnit entity.
 */
@Repository
public interface TrainingUnitRepository extends JpaRepository<TrainingUnit, Long> {

    @Query("select trainingUnit from TrainingUnit trainingUnit where trainingUnit.user.login = ?#{principal.username}")
    List<TrainingUnit> findByUserIsCurrentUser();

    @Query(value = "select distinct trainingUnit from TrainingUnit trainingUnit left join fetch trainingUnit.workouts",
        countQuery = "select count(distinct trainingUnit) from TrainingUnit trainingUnit")
    Page<TrainingUnit> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct trainingUnit from TrainingUnit trainingUnit left join fetch trainingUnit.workouts")
    List<TrainingUnit> findAllWithEagerRelationships();

    @Query("select distinct trainingUnit from TrainingUnit trainingUnit left join fetch trainingUnit.workouts where trainingUnit.user.login = ?#{principal.username}")
    List<TrainingUnit> findByUserIsCurrentUserWithEagerRelationships();

    @Query("select trainingUnit from TrainingUnit trainingUnit left join fetch trainingUnit.workouts where trainingUnit.id =:id")
    Optional<TrainingUnit> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select trainingUnit from TrainingUnit trainingUnit left join fetch trainingUnit.workouts where trainingUnit.user.login = ?#{principal.username} and trainingUnit.id = ?1")
    Optional<TrainingUnit> findOneByUserIsCurrentUserAndIdWithEagerRelationships(Long id);
}
