package com.example.Projeto_Final.Controller;

import com.example.Projeto_Final.Model.Produto;
import com.example.Projeto_Final.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    ProdutoRepository _repo;

    @PostMapping("/add")
    public void addProduto(@RequestBody Produto _produto) {
        _repo.save(_produto);
    }

    @GetMapping("/find/all")
    public List<Produto> findAll() {
        return _repo.findAll();
    }

    @GetMapping("/find/id/{codigo}")
    public Optional<Produto> findByCodigo(@PathVariable int codigo) {
        return _repo.findById(codigo);
    }

    @GetMapping("/find/descripiton/starts/{desc}")
    public List<Produto> findByDescriptionStartsWith(@PathVariable String desc) {
        return _repo.findByDescriptionStartsWith(desc);
    }

    @GetMapping("/find/price/less/{price}")
    public List<Produto> findByPrecoLessThan(@PathVariable double price) {
        return _repo.findByPrecoLessThan(price);
    }

    @GetMapping("/find/marca/{marca}")
    public List<Produto> findByMarca(@PathVariable String marca) {
        return _repo.findByMarca(marca);
    }

    @GetMapping("/find/descripiton/contains/{desc}/less/{price}")
    public List<Produto> findByDescriptionContainsAndPrecoLessThan(@PathVariable String desc, @PathVariable double price) {
        return _repo.findByDescriptionContainsAndPrecoLessThan(desc, price);
    }

    @DeleteMapping("/remove")
    public void removeProduto(@RequestBody Produto _produto) {
        _repo.delete(_produto);
    }

    @DeleteMapping("/remove/{codigo}")
    public void removeProdutoCodigo(@PathVariable int codigo) {
        _repo.deleteById(codigo);
    }

    @PutMapping("/update/{codigo}")
    public void updateProduto(@PathVariable int codigo, @RequestBody Produto _produto) {
        _produto.setCodigo(codigo);
        _repo.save(_produto);
    }
}