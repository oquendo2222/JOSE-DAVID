/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.compuwork;

/**
 *
 * @author Usuario
 */
public class CompuWork {

    public static void main(String[] args) {
        
        ServicioEmpleado servicioEmpleado = null;
        ServicioDepartamento servicioDepartamento = null;

        try {
            servicioEmpleado = new ServicioEmpleado();
            servicioDepartamento = new ServicioDepartamento();
        } catch (Exception e) {
            System.out.println("Error al inicializar los servicios: " + e.getMessage());
            return; // Salimos si no se pueden inicializar los servicios
        }

        ServicioReporteDesempeno servicioReporteDesempeno = null;
        try {            
            servicioReporteDesempeno = new ServicioReporteDesempeno();            
        } catch (Exception r) {
            System.out.println("Error al generar reporte: " + r.getMessage());
            return;             
        }

        Departamento departamento1 = new Departamento(1, "Recursos Humanos", "Gestión de personal");
        servicioDepartamento.agregarDepartamento(departamento1);

        Empleado empleado1 = new Empleado(1, "Juan", "David", "Calle 1", "11222", "juan@gmail.com", "Permanente");
        servicioEmpleado.agregarEmpleado(empleado1);

        servicioEmpleado.asignarEmpleadoADepartamento(empleado1, departamento1);

        System.out.println(servicioEmpleado.obtenerTodosLosEmpleados());
    }
}

