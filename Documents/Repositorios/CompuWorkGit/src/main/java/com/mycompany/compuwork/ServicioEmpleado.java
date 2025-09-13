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
public class ServicioEmpleado {
   
    private List<Empleado> empleados = new ArrayList<>();
     
    public void agregarEmpleado(Empleado empleado) {
        empleados.add(empleado);
    }
    
    
    public void actualizarEmpleado(Empleado empleadoActualizado) {
        for (int i = 0; i < empleados.size(); i++) {
            if (empleados.get(i).getId() == empleadoActualizado.getId()) {
                empleados.set(i, empleadoActualizado);
                break;
            }
        }
    }
    
    public void eliminarEmpleado(int id) {
        empleados.removeIf(empleado -> empleado.getId() == id);
    }
     public Empleado obtenerEmpleado(int id) {
        for (Empleado empleado : empleados) {
            if (empleado.getId() == id) {
                return empleado;
            }
        }
        return null;
    }

    public List<Empleado> obtenerTodosLosEmpleados() {
        return empleados;
    }

    public void asignarEmpleadoADepartamento(Empleado empleado, Departamento departamento) {
        empleado.setDepartamento(departamento);
    }
   
}
