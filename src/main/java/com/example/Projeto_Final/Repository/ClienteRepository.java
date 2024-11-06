package com.example.Projeto_Final.Repository;

import com.example.Projeto_Final.Model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {


    @Query("select a from Cliente a where a.nome like %?1%")
    public List<Cliente> findByNameWith(String nome);

    @Query("select a from Cliente a where a.nome like ?1%")
    public List<Cliente> findByNameStartsWith(String nome);

    @Query("select a from Cliente a where a.email like ?1")
    public List<Cliente> findByEmail(String email);

    @Query("select a from Cliente a where a.nome like %?1% and a.email like %?2%")
    public List<Cliente> findByNomeAndEmail(String nome, String email);
}
