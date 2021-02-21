package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.Weight;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Weight entity.
 */
@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {

    @Query("select weight from Weight weight where weight.user.login = ?#{principal.username}")
    List<Weight> findByUserIsCurrentUser();

    @Query("select weight from Weight weight where weight.user.login = ?#{principal.username} and weight.id = ?1")
    Optional<Weight> findByUserIsCurrentUserAndId(Long id);

}
