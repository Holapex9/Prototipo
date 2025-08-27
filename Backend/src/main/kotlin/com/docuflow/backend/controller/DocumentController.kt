package com.docuflow.backend.controller

import com.docuflow.backend.model.Document
import com.docuflow.backend.repository.DocumentRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/files")
class DocumentController(private val documentRepository: DocumentRepository) {

    // 🟢 Listar todos los archivos
    @GetMapping
    fun listFiles(): ResponseEntity<List<Document>> {
        val files = documentRepository.findAll()
        return ResponseEntity.ok(files)
    }

    // 🟢 Obtener un archivo por id
    @GetMapping("/{id}")
    fun getFile(@PathVariable id: Long): ResponseEntity<Document> {
        val file = documentRepository.findById(id)
        return if (file.isPresent) ResponseEntity.ok(file.get())
        else ResponseEntity.notFound().build()
    }

    // 🟢 Eliminar un archivo
    @DeleteMapping("/{id}")
    fun deleteFile(@PathVariable id: Long): ResponseEntity<Map<String, String>> {
        return if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id)
            ResponseEntity.ok(mapOf("mensaje" to "Archivo eliminado"))
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
