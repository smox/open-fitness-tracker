package org.sm0x.openfitnesstracker.repository;

import org.sm0x.openfitnesstracker.domain.ProtocolledWeight;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ProtocolledWeight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProtocolledWeightRepository extends JpaRepository<ProtocolledWeight, Long> {

    @Query("select protocolledWeight from ProtocolledWeight protocolledWeight where protocolledWeight.user.login = ?#{principal.username}")
    List<ProtocolledWeight> findByUserIsCurrentUser();

    @Query("select protocolledWeight from ProtocolledWeight protocolledWeight where protocolledWeight.user.login = ?#{principal.username} and protocolledWeight.id = ?1")
    Optional<ProtocolledWeight> findByUserIsCurrentUserAndId(Long id);
}
