package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.TrainingSchedule;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TrainingSchedule entity.
 */
@Repository
public interface TrainingScheduleRepository extends JpaRepository<TrainingSchedule, Long> {

    @Query("select trainingSchedule from TrainingSchedule trainingSchedule where trainingSchedule.user.login = ?#{principal.username}")
    List<TrainingSchedule> findByUserIsCurrentUser();

    @Query(value = "select distinct trainingSchedule from TrainingSchedule trainingSchedule left join fetch trainingSchedule.trainingUnits",
        countQuery = "select count(distinct trainingSchedule) from TrainingSchedule trainingSchedule")
    Page<TrainingSchedule> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct trainingSchedule from TrainingSchedule trainingSchedule left join fetch trainingSchedule.trainingUnits")
    List<TrainingSchedule> findAllWithEagerRelationships();

    @Query("select trainingSchedule from TrainingSchedule trainingSchedule left join fetch trainingSchedule.trainingUnits where trainingSchedule.id =:id")
    Optional<TrainingSchedule> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select trainingSchedule from TrainingSchedule trainingSchedule where trainingSchedule.user.login = ?#{principal.username} and trainingSchedule.id = ?1")
    Optional<TrainingSchedule> findByUserIsCurrentUserAndId(Long id);
}
