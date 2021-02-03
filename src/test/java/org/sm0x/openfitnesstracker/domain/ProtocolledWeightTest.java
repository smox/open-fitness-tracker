package org.sm0x.openfitnesstracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.openfitnesstracker.web.rest.TestUtil;

public class ProtocolledWeightTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProtocolledWeight.class);
        ProtocolledWeight protocolledWeight1 = new ProtocolledWeight();
        protocolledWeight1.setId(1L);
        ProtocolledWeight protocolledWeight2 = new ProtocolledWeight();
        protocolledWeight2.setId(protocolledWeight1.getId());
        assertThat(protocolledWeight1).isEqualTo(protocolledWeight2);
        protocolledWeight2.setId(2L);
        assertThat(protocolledWeight1).isNotEqualTo(protocolledWeight2);
        protocolledWeight1.setId(null);
        assertThat(protocolledWeight1).isNotEqualTo(protocolledWeight2);
    }
}
