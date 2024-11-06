package com.example.Projeto_Final.Repository;

import com.example.Projeto_Final.Model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.*;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    @Query("select a from Produto a where a.descricao like ?1%")
    public List<Produto> findByDescriptionStartsWith(String descricao);

    @Query("select a from Produto a where a.preco < ?1")
    public List<Produto> findByPrecoLessThan(Double preco);

    @Query("select a from Produto a where a.marca like ?1")
    public List<Produto> findByMarca(String marca);

    @Query("select a from Produto a where a.descricao like %?1% and a.preco < ?2")
    public List<Produto> findByDescriptionContainsAndPrecoLessThan(String descricao, Double preco);
}