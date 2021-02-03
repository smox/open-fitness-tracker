package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.Media;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Media entity.
 */
@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {

    @Query("select media from Media media where media.user.login = ?#{principal.username}")
    List<Media> findByUserIsCurrentUser();

    @Query(value = "select distinct media from Media media left join fetch media.trainingUnits left join fetch media.workouts",
        countQuery = "select count(distinct media) from Media media")
    Page<Media> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct media from Media media left join fetch media.trainingUnits left join fetch media.workouts")
    List<Media> findAllWithEagerRelationships();

    @Query("select media from Media media left join fetch media.trainingUnits left join fetch media.workouts where media.id =:id")
    Optional<Media> findOneWithEagerRelationships(@Param("id") Long id);
}
