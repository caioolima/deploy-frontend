import React from 'react'
import { useTranslation } from 'react-i18next'

const MediaModal = ({
    showMediaModal,
    handleDragOver,
    handleDrop,
    handleMediaModalClose,
    mediaFile,
    handleCancel,
    messageInput,
    handleMediaFileChange,
    AiOutlineCamera,
    mediaUploading, 
    handleMediaUpload,
    setSendingMessage,
    sendMessage
}) => {
    const { t } = useTranslation();

    return (
        <>
            {showMediaModal && (
                <div className="media-modal">
                    <div
                        className="media-modal-content"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <span className="close-media-modal" onClick={handleMediaModalClose}>
                            &times;
                        </span>
                        <h2 className="upload-name-media">{t('Enviar Mídia')}</h2>
                        {/* Mostrar conteúdo após anexar mídia */}
                        {mediaFile && (
                            <div>
                                {mediaFile.type.startsWith("video/") ? (
                                    <video
                                        src={URL.createObjectURL(mediaFile)}
                                        controls
                                        className="attached-media"
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(mediaFile)}
                                        alt={t('Mídia anexada')}
                                        className="attached-media"
                                    />
                                )}
                                <div className="button-group">
                                    <button className="cancel-button" onClick={handleCancel}>
                                        {t('Cancelar')}
                                    </button>
                                    <button
                                        className={`send-button ${messageInput.trim() === "" && !mediaFile ? "disabled-message" : ""}`}
                                        onClick={() => {
                                            if (!mediaUploading) {
                                                handleMediaUpload();
                                                setSendingMessage(true);
                                                sendMessage();
                                            }
                                        }}
                                        disabled={messageInput.trim() === "" && !mediaFile}
                                    >
                                        {mediaUploading ? t('Enviando...') : t('Enviar')}
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Renderizar apenas se não houver mídia selecionada */}
                        {!mediaFile && (
                            <>
                                <input
                                    type="file"
                                    id="media-file-input"
                                    accept="image/*, video/*" // Aceita tanto imagens quanto vídeos
                                    onChange={handleMediaFileChange}
                                    style={{ display: "none" }}
                                />
                                <label
                                    htmlFor="media-file-input"
                                    className="custom-file-upload-media"
                                >
                                    <AiOutlineCamera className="camera-icon-media" />{" "}
                                    <span className="upload-midia-name">{t('Anexar mídia')}</span>
                                </label>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default MediaModal;
