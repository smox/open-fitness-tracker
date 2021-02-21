package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.CompletedSet;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the CompletedSet entity.
 */
@Repository
public interface CompletedSetRepository extends JpaRepository<CompletedSet, Long> {

    @Query("select completedSet from CompletedSet completedSet where completedSet.user.login = ?#{principal.username}")
    List<CompletedSet> findByUserIsCurrentUser();

    @Query("select completedSet from CompletedSet completedSet where completedSet.user.login = ?#{principal.username} and completedSet.id = ?1")
    Optional<CompletedSet> findByUserIsCurrentUserAndId(Long id);
}
