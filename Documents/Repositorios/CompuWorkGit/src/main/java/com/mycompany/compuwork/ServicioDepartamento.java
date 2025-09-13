/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.compuwork;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Usuario
 */
public class ServicioDepartamento {
    
    private List<Departamento> departamentos = new ArrayList<>();

    public void agregarDepartamento(Departamento departamento) {
        departamentos.add(departamento);
    }

    public void actualizarDepartamento(Departamento departamentoActualizado) {
        for (int i = 0; i < departamentos.size(); i++) {
            if (departamentos.get(i).getId() == departamentoActualizado.getId()) {
                departamentos.set(i, departamentoActualizado);
                break;
            }
        }
    }
    
     public void eliminarDepartamento(int id) {
        departamentos.removeIf(departamento -> departamento.getId() == id);
    }

    public Departamento obtenerDepartamento(int id) {
        for (Departamento departamento : departamentos) {
            if (departamento.getId() == id) {
                return departamento;
            }
        }
        return null;
    }

    public List<Departamento> obtenerTodosLosDepartamentos() {
        return departamentos;
    }

}


