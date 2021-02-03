package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.CompletedSet;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the CompletedSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompletedSetRepository extends JpaRepository<CompletedSet, Long> {

    @Query("select completedSet from CompletedSet completedSet where completedSet.user.login = ?#{principal.username}")
    List<CompletedSet> findByUserIsCurrentUser();
}
