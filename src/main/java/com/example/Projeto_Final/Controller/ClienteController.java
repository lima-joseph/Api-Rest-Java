package com.example.Projeto_Final.Controller;

import com.example.Projeto_Final.Model.Cliente;
import com.example.Projeto_Final.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteRepository _repo;

    @PostMapping("/add")
    public void addCliente(@RequestBody Cliente _cliente) {
        _repo.save(_cliente);
    }

    @GetMapping("/find/all")
    public List<Cliente> findAll() {
        return _repo.findAll();
    }

    @GetMapping("/find/id/{codigo}")
    public Optional<Cliente> findByCodigo(@PathVariable int codigo) {
        return _repo.findById(codigo);
    }

    @GetMapping("/find/name/init/{nome}")
    public List<Cliente> findByNameStartsWith(@PathVariable String nome) {
        return _repo.findByNameStartsWith(nome);
    }

    @GetMapping("/find/email/{email}")
    public List<Cliente> findByEmail(@PathVariable String email) {
        return _repo.findByEmail(email);
    }

    @GetMapping("find/name/{nome}/email/{email}")
    public List<Cliente> findByNomeAndEmail(@PathVariable String nome, @PathVariable String email){
        return _repo.findByNomeAndEmail(nome,email);
    }

    @DeleteMapping("/remove")
    public void removeCliente(@RequestBody Cliente _cliente) {
        _repo.delete(_cliente);
    }

    @DeleteMapping("/remove/{codigo}")
    public void removeClienteCodigo(@PathVariable int codigo) {
        _repo.deleteById(codigo);
    }

    @PutMapping("/update/{codigo}")
    public void updateCliente(@PathVariable int codigo, @RequestBody Cliente _cliente) {
        _cliente.setCodigo(codigo);
        _repo.save(_cliente);
    }
}