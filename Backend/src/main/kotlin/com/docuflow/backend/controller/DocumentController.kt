package com.docuflow.backend.controller

import com.docuflow.backend.model.Document
import com.docuflow.backend.repository.DocumentRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/files")
class DocumentController(private val documentRepository: DocumentRepository) {

    // 🟢 Listar todos los archivos
    @GetMapping("/{id}")
    fun getFile(@PathVariable id: Long): ResponseEntity<Any> {
        val file = documentRepository.findById(id)
        return if (file.isPresent) {
            ResponseEntity.ok(file.get())
        } else {
            ResponseEntity.status(404).body(mapOf("error" to "Archivo no encontrado"))
    }

        return ResponseEntity.ok(files)
    }
    
    // 🟢 Eliminar un archivo
    @DeleteMapping("/{id}")
    fun deleteFile(@PathVariable id: Long): ResponseEntity<Map<String, String>> {
        return if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id)
            ResponseEntity.ok(mapOf("mensaje" to "Archivo eliminado"))
        } else {
            ResponseEntity.status(404).body(mapOf("error" to "Archivo no encontrado"))
        }
    }
}
