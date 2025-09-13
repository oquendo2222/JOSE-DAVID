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
public class ServicioReporteDesempeno {
    
     private List<ReporteDesempeno> reportes = new ArrayList<>();

    public void agregarReporte(ReporteDesempeno reporte) {
        reportes.add(reporte);
    }

    public List<ReporteDesempeno> obtenerReportesPorEmpleado(Empleado empleado) {
        List<ReporteDesempeno> reportesEmpleado = new ArrayList<>();
        for (ReporteDesempeno reporte : reportes) {
            if (reporte.getEmpleado().equals(empleado)) {
                reportesEmpleado.add(reporte);
            }
        }
        return reportesEmpleado;
    }

    public double promedioProductividadEmpleado(Empleado empleado){
        double promedio = 0;
        int contador = 0;
        for (ReporteDesempeno reporte : reportes){
            if(reporte.getEmpleado().equals(empleado)){
                promedio = promedio + reporte.getProductividad();
                contador++;
            }
        }
        if(contador > 0){
            return promedio / contador;
        } else {
            return 0;
        }
    }

    
}
