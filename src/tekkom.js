import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
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

    handleButton = (nama, alamat, nomor) => {
        alert("Bapak/Ibu " + nama + " bertempat tinggal di " + alamat + " (" + nomor + ") ");
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
    handleSubmit = () => {
        if (
            this.state.nama !== "" &&
            this.state.nomor !== "" &&
            !this.state.alamat !== ""
        ) {
            axios({
                method: "post",
                url: "http://36.80.179.203/api/index.php/kontak",
                headers: {
                    accept: "*/*",
                },
                data: {
                    nama: this.state.nama,
                    nomor: this.state.nomor,
                    alamat: this.state.alamat,
                },
            })
                .then((data) => {
                    alert("berhasil menambahkan");
                    window.location.reload();
                })
                .catch((error) => {
                    alert("gagal lur");
                });
        } else {
            alert("pastikan semua kolom terisi");
        }
    };

    handleUpdate = (id,nama,nomor,alamat) => {

        var value = {
            id : id,
            nama : 'Ganti',
            nomor : nomor,
            alamat : alamat,
        }


        axios({
            method: "put",
            url: "http://36.80.179.203/api/index.php/kontak",
            headers: {
                accept: "*/*",
            },
            data: value,
        })

        .then(function (response) {
            if (response.status === 200) {
              console.log("Update Success");
              alert("Berhasil Update");
            }
          })
          .catch(function (response) {
            console.log(response);
            alert("Terjadi Masalah");
          });
    }



    componentDidMount() {
        axios({
            method: "get",
            url: "http://36.80.179.203/api/index.php/kontak",

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
                        <h1>List data kontak</h1>
                    </center>
                    <center>
                        <button onClick={this.handleTambahOrang}>Tambah Kontak Baru</button>
                    </center>

                    {<Modal
                        title="Tambah Kontak"
                        centered='true'
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={() => this.setState({ visible: false })}
                        width={500}
                    >
                        <div style={{ textAlign: "center" }}>
                            <p>Nama : </p>{" "}
                            <input
                                type="text"
                                placeholder="nama"
                                onChange={this.handleNama}
                            />
                            <br />
                            <p>Nomor Telepon : </p>{" "}
                            <input type="text" placeholder="nomor" onChange={this.handleNomor} />
                            <br />
                            <p>Alamat : </p>{" "}
                            <input
                                type="text"
                                placeholder="alamat"
                                onChange={this.handleAlamat}
                            />
                            <br />
                        </div>
                    </Modal>}

                    



                    {this.state.tekkom.map((results, index) => {
                        console.log(results);
                        return (
                            <div className="card" key={results.id}>
                                <div className="card-body">
                                    <h5 className="card-title">Nama : {results.nama}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        Nomor Telepon : {results.nomor}
                                    </h6>
                                </div>
                                <button className="button" onClick={() => this.handleButton(results.nama, results.alamat, results.nomor)}>Detail</button>
                                <button className="button" onClick={() => this.handleUpdate(results.id,results.nama, results.alamat, results.nomor)}>Update Kontak {results.nama}</button>
                            </div>
                        );
                    })}


                </div>
            </div>
        );
    }
} 