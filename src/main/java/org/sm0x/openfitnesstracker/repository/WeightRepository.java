package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.Weight;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Weight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {
}
