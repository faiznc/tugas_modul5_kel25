import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";

export default class tekkom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tekkom: [],
            visible: false,
            nama: "",
            alamat: "",
            nomor: ""
        };
    }

    handleButton = (name, lat, long, height) => {
        alert("Stasiun Cuaca " + name + " berlokasi di " + lat + "," + long + " dengan ketinggian " + height);
    };
    handleTambahOrang = () => {
        this.setState({
            visible: true,
        });
    };
    handleNama = (e) => {
        this.setState({
            nama: e.target.value,
        });
        console.log(this.state.nama);
    };
    handleNomor = (e) => {
        this.setState({
            nomor: e.target.value,
        });
        console.log(this.state.nomor);
    };
    handleAlamat = (e) => {
        this.setState({
            alamat: e.target.value,
        });
        console.log(this.state.alamat);
    };

    componentDidMount() {
        axios({
            method: "get",
            url: "https://api.met.no/weatherapi/airqualityforecast/0.1/stations",
            headers: { 'content-type': 'application/x-www-form-urlencoded' },

            proxy: {
                host: '172.67.182.58',
                port: 80
            }

        })
            .then((data) => {
                console.log(data.data);
                this.setState({
                    tekkom: data.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="boxWhite">
                    <center>
                        <h2>Data stasiun cuaca</h2>
                        <h1>Norwegia</h1>
                    </center>

                    {this.state.tekkom.map((results, index) => {
                        console.log(results);
                        return (
                            <center>
                                <div className="card" key={results.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">Nama Stasiun : {results.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            Latitude : {results.latitude}
                                        </h6>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            Longitude : {results.longitude}
                                        </h6>
                                    </div>
                                    <button className="button" onClick={() => this.handleButton(results.name, results.latitude, results.longitude, results.height)}>Detail</button>
                                </div>
                            </center>
                        );
                    })}
                </div>
            </div>
        );
    }
} 