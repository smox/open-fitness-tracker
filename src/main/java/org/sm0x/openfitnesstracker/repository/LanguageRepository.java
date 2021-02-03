package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.Language;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Language entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
}
