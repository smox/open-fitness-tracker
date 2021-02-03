package org.sm0x.openfitnesstracker.web.rest;

import org.sm0x.openfitnesstracker.OpenfitnesstrackerApp;
import org.sm0x.openfitnesstracker.domain.Media;
import org.sm0x.openfitnesstracker.repository.MediaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MediaResource} REST controller.
 */
@SpringBootTest(classes = OpenfitnesstrackerApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class MediaResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KIND = "AAAAAAAAAA";
    private static final String UPDATED_KIND = "BBBBBBBBBB";

    private static final byte[] DEFAULT_BINARY_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BINARY_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BINARY_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BINARY_DATA_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_ADDITIONAL_INFORMATION = "AAAAAAAAAA";
    private static final String UPDATED_ADDITIONAL_INFORMATION = "BBBBBBBBBB";

    @Autowired
    private MediaRepository mediaRepository;

    @Mock
    private MediaRepository mediaRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMediaMockMvc;

    private Media media;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Media createEntity(EntityManager em) {
        Media media = new Media()
            .name(DEFAULT_NAME)
            .kind(DEFAULT_KIND)
            .binaryData(DEFAULT_BINARY_DATA)
            .binaryDataContentType(DEFAULT_BINARY_DATA_CONTENT_TYPE)
            .additionalInformation(DEFAULT_ADDITIONAL_INFORMATION);
        return media;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Media createUpdatedEntity(EntityManager em) {
        Media media = new Media()
            .name(UPDATED_NAME)
            .kind(UPDATED_KIND)
            .binaryData(UPDATED_BINARY_DATA)
            .binaryDataContentType(UPDATED_BINARY_DATA_CONTENT_TYPE)
            .additionalInformation(UPDATED_ADDITIONAL_INFORMATION);
        return media;
    }

    @BeforeEach
    public void initTest() {
        media = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedia() throws Exception {
        int databaseSizeBeforeCreate = mediaRepository.findAll().size();
        // Create the Media
        restMediaMockMvc.perform(post("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isCreated());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeCreate + 1);
        Media testMedia = mediaList.get(mediaList.size() - 1);
        assertThat(testMedia.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMedia.getKind()).isEqualTo(DEFAULT_KIND);
        assertThat(testMedia.getBinaryData()).isEqualTo(DEFAULT_BINARY_DATA);
        assertThat(testMedia.getBinaryDataContentType()).isEqualTo(DEFAULT_BINARY_DATA_CONTENT_TYPE);
        assertThat(testMedia.getAdditionalInformation()).isEqualTo(DEFAULT_ADDITIONAL_INFORMATION);
    }

    @Test
    @Transactional
    public void createMediaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mediaRepository.findAll().size();

        // Create the Media with an existing ID
        media.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMediaMockMvc.perform(post("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isBadRequest());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        // Get all the mediaList
        restMediaMockMvc.perform(get("/api/media?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(media.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].kind").value(hasItem(DEFAULT_KIND)))
            .andExpect(jsonPath("$.[*].binaryDataContentType").value(hasItem(DEFAULT_BINARY_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].binaryData").value(hasItem(Base64Utils.encodeToString(DEFAULT_BINARY_DATA))))
            .andExpect(jsonPath("$.[*].additionalInformation").value(hasItem(DEFAULT_ADDITIONAL_INFORMATION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMediaWithEagerRelationshipsIsEnabled() throws Exception {
        when(mediaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMediaMockMvc.perform(get("/api/media?eagerload=true"))
            .andExpect(status().isOk());

        verify(mediaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMediaWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(mediaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMediaMockMvc.perform(get("/api/media?eagerload=true"))
            .andExpect(status().isOk());

        verify(mediaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        // Get the media
        restMediaMockMvc.perform(get("/api/media/{id}", media.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(media.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.kind").value(DEFAULT_KIND))
            .andExpect(jsonPath("$.binaryDataContentType").value(DEFAULT_BINARY_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.binaryData").value(Base64Utils.encodeToString(DEFAULT_BINARY_DATA)))
            .andExpect(jsonPath("$.additionalInformation").value(DEFAULT_ADDITIONAL_INFORMATION));
    }
    @Test
    @Transactional
    public void getNonExistingMedia() throws Exception {
        // Get the media
        restMediaMockMvc.perform(get("/api/media/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        int databaseSizeBeforeUpdate = mediaRepository.findAll().size();

        // Update the media
        Media updatedMedia = mediaRepository.findById(media.getId()).get();
        // Disconnect from session so that the updates on updatedMedia are not directly saved in db
        em.detach(updatedMedia);
        updatedMedia
            .name(UPDATED_NAME)
            .kind(UPDATED_KIND)
            .binaryData(UPDATED_BINARY_DATA)
            .binaryDataContentType(UPDATED_BINARY_DATA_CONTENT_TYPE)
            .additionalInformation(UPDATED_ADDITIONAL_INFORMATION);

        restMediaMockMvc.perform(put("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedia)))
            .andExpect(status().isOk());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeUpdate);
        Media testMedia = mediaList.get(mediaList.size() - 1);
        assertThat(testMedia.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMedia.getKind()).isEqualTo(UPDATED_KIND);
        assertThat(testMedia.getBinaryData()).isEqualTo(UPDATED_BINARY_DATA);
        assertThat(testMedia.getBinaryDataContentType()).isEqualTo(UPDATED_BINARY_DATA_CONTENT_TYPE);
        assertThat(testMedia.getAdditionalInformation()).isEqualTo(UPDATED_ADDITIONAL_INFORMATION);
    }

    @Test
    @Transactional
    public void updateNonExistingMedia() throws Exception {
        int databaseSizeBeforeUpdate = mediaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMediaMockMvc.perform(put("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isBadRequest());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        int databaseSizeBeforeDelete = mediaRepository.findAll().size();

        // Delete the media
        restMediaMockMvc.perform(delete("/api/media/{id}", media.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
