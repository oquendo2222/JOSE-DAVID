/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.compuwork;

/**
 *
 * @author Usuario
 */
public class ReporteDesempeno {
    
    private int id;
    private Empleado empleado;
    private String fecha;
    private double productividad;
    private int horasTrabajadas;
    private String comentarios;

    public ReporteDesempeno(int id, Empleado empleado, String fecha, double productividad, int horasTrabajadas, String comentarios) {
        this.id = id;
        this.empleado = empleado;
        this.fecha = fecha;
        this.productividad = productividad;
        this.horasTrabajadas = horasTrabajadas;
        this.comentarios = comentarios;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public double getProductividad() {
        return productividad;
    }

    public void setProductividad(double productividad) {
        this.productividad = productividad;
    }

    public int getHorasTrabajadas() {
        return horasTrabajadas;
    }

    public void setHorasTrabajadas(int horasTrabajadas) {
        this.horasTrabajadas = horasTrabajadas;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }
    
    
    
}
